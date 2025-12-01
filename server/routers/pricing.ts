/**
 * Pricing Calculator tRPC Router
 * 
 * Internal admin-only API for configuration-based pricing calculations.
 * Used by sales team to generate quotes for enterprise customers.
 */

import { z } from 'zod';
import { router, protectedProcedure } from '../_core/trpc';
import { pricingQuotes } from '../../drizzle/schema';
import { getDb } from '../db';
import { calculatePricing, validatePricingRequest } from '../lib/pricingCalculator';
import { getTierDefinition, getPricingRates, Tier } from '../lib/pricingRates';
import { createStripeInvoice, sendInvoiceEmail, getInvoiceStatus } from '../lib/stripeInvoice';
import { generatePDFProposal } from '../lib/pdfProposal';
import { readFile } from 'fs/promises';
import { eq } from 'drizzle-orm';

// Validation schemas
const tierSchema = z.enum(['Basic', 'Professional', 'Advanced', 'Enterprise']);

const pricingRequestSchema = z.object({
  tier: tierSchema,
  customerName: z.string().optional(),
  industry: z.string().optional(),
  region: z.string().optional(),
  users: z.number().int().min(0),
  suppliers: z.number().int().min(0),
  protocols: z.number().int().min(0),
  sites: z.number().int().min(0),
  partnerTypes: z.number().int().min(0),
  erpIntegration: z.boolean(),
  esrsSupport: z.boolean(),
  supportPremium: z.boolean(),
  termYears: z.number().int().min(1).optional(),
  currency: z.string().optional(),
});

const saveQuoteSchema = pricingRequestSchema.extend({
  notes: z.string().optional(),
});

export const pricingRouter = router({
  /**
   * Calculate pricing based on configuration
   * Returns detailed breakdown without saving
   */
  calculate: protectedProcedure
    .input(pricingRequestSchema)
    .mutation(async ({ input }) => {
      // Validate request
      const errors = validatePricingRequest(input);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }
      
      // Calculate pricing
      const result = calculatePricing(input);
      
      return result;
    }),
  
  /**
   * Save a quote to database
   * Returns quote ID and pricing breakdown
   */
  saveQuote: protectedProcedure
    .input(saveQuoteSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Calculate pricing
      const pricing = calculatePricing(input);
      
      // Save to database
      const [quote] = await db.insert(pricingQuotes).values({
        customerName: input.customerName,
        industry: input.industry,
        region: input.region,
        tier: input.tier,
        users: input.users,
        suppliers: input.suppliers,
        protocols: input.protocols,
        sites: input.sites,
        partnerTypes: input.partnerTypes,
        erpIntegration: input.erpIntegration ? 1 : 0,
        esrsSupport: input.esrsSupport ? 1 : 0,
        supportPremium: input.supportPremium ? 1 : 0,
        basePrice: pricing.basePrice,
        usersPrice: pricing.usersPrice,
        suppliersPrice: pricing.suppliersPrice,
        protocolsPrice: pricing.protocolsPrice,
        sitesPrice: pricing.sitesPrice,
        partnerTypesPrice: pricing.partnerTypesPrice,
        erpIntegrationPrice: pricing.erpIntegrationPrice,
        esrsSupportPrice: pricing.esrsSupportPrice,
        supportPremiumPrice: pricing.supportPremiumPrice,
        annualPrice: pricing.annualPrice,
        termYears: pricing.termYears,
        currency: pricing.currency,
        status: 'draft',
        notes: input.notes,
        createdBy: ctx.user.id,
      });
      
      return {
        quoteId: quote.insertId,
        pricing,
      };
    }),
  
  /**
   * Get a saved quote by ID
   */
  getQuote: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const [quote] = await db
        .select()
        .from(pricingQuotes)
        .where(eq(pricingQuotes.id, input.id))
        .limit(1);
      
      if (!quote) {
        throw new Error('Quote not found');
      }
      
      return quote;
    }),
  
  /**
   * List all quotes (with pagination)
   */
  listQuotes: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
      status: z.enum(['draft', 'sent', 'won', 'lost']).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      if (input.status) {
        const quotes = await db
          .select()
          .from(pricingQuotes)
          .where(eq(pricingQuotes.status, input.status))
          .orderBy(pricingQuotes.createdAt)
          .limit(input.limit)
          .offset(input.offset);
        return quotes;
      }
      
      const quotes = await db
        .select()
        .from(pricingQuotes)
        .orderBy(pricingQuotes.createdAt)
        .limit(input.limit)
        .offset(input.offset);
      
      return quotes;
    }),
  
  /**
   * Update quote status
   */
  updateQuoteStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(['draft', 'sent', 'won', 'lost']),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .update(pricingQuotes)
        .set({ status: input.status })
        .where(eq(pricingQuotes.id, input.id));
      
      return { success: true };
    }),
  
   /**
   * Get pricing rates (for UI display)
   */
  getRates: protectedProcedure.query(() => {
    return getPricingRates();
  }),

  /**
   * Get tier definitions (for UI display)
   */
  getTiers: protectedProcedure
    .query(() => {
      const tiers: Tier[] = ['Basic', 'Professional', 'Advanced', 'Enterprise'];
      return tiers.map(tier => ({
        name: tier,
        ...getTierDefinition(tier),
      }));
    }),

  /**
   * Generate Stripe invoice from quote
   */
  generateInvoice: protectedProcedure
    .input(z.object({
      quoteId: z.number(),
      customerEmail: z.string().email(),
      dueDate: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      // Get quote
      const [quote] = await db
        .select()
        .from(pricingQuotes)
        .where(eq(pricingQuotes.id, input.quoteId))
        .limit(1);

      if (!quote) {
        throw new Error('Quote not found');
      }

      const pricingData = quote.pricingData as any;

      // Build line items
      const lineItems = [];

      lineItems.push({
        description: `${quote.tier} Tier - Annual License`,
        amount: Math.round(pricingData.annualPrice * 100),
      });

      // Create Stripe invoice
      const invoice = await createStripeInvoice({
        customerEmail: input.customerEmail,
        customerName: quote.customerName,
        lineItems,
        metadata: {
          quoteId: quote.id.toString(),
          tier: quote.tier,
        },
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      });

      // Update quote with invoice ID
      await db
        .update(pricingQuotes)
        .set({
          stripeInvoiceId: invoice.invoiceId,
          status: 'sent',
        })
        .where(eq(pricingQuotes.id, input.quoteId));

      return {
        invoiceId: invoice.invoiceId,
        invoiceNumber: invoice.invoiceNumber,
        paymentLink: invoice.paymentLink,
        amount: invoice.amount / 100,
      };
    }),

  /**
   * Get invoice status
   */
  getInvoiceStatus: protectedProcedure
    .input(z.object({ invoiceId: z.string() }))
    .query(async ({ input }) => {
      const status = await getInvoiceStatus(input.invoiceId);
      return {
        ...status,
        amountPaid: status.amountPaid / 100,
        amountDue: status.amountDue / 100,
      };
    }),

  /**
   * Export quote as PDF proposal
   */
  exportPDF: protectedProcedure
    .input(z.object({ quoteId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      // Get quote
      const [quote] = await db
        .select()
        .from(pricingQuotes)
        .where(eq(pricingQuotes.id, input.quoteId))
        .limit(1);

      if (!quote) {
        throw new Error('Quote not found');
      }

      const pricingData = quote.pricingData as any;
      const tierDef = getTierDefinition(quote.tier as Tier);

      // Generate PDF
      const pdfPath = await generatePDFProposal({
        quoteId: quote.id,
        customerName: quote.customerName,
        industry: quote.industry || undefined,
        region: quote.region || undefined,
        tier: quote.tier,
        pricing: pricingData,
        configuration: {
          users: quote.users,
          suppliers: quote.suppliers,
          protocols: quote.protocols,
          sites: quote.sites,
          partnerTypes: quote.partnerTypes,
          erpIntegration: quote.erpIntegration,
          esrsSupport: quote.esrsSupport,
          supportPremium: quote.supportPremium,
        },
        tierInclusions: tierDef,
        notes: quote.notes || undefined,
        createdAt: quote.createdAt,
      });

      // Read PDF file as base64
      const pdfBuffer = await readFile(pdfPath);
      const pdfBase64 = pdfBuffer.toString('base64');

      return {
        filename: `Intelleges-Proposal-${quote.customerName.replace(/[^a-zA-Z0-9]/g, '-')}-${quote.id}.pdf`,
        data: pdfBase64,
        mimeType: 'application/pdf',
      };
    }),
});

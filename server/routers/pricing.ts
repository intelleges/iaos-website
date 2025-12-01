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
import { createStripeInvoice } from '../lib/stripeInvoice';
import { generatePDFProposal } from '../lib/pdfProposal';
import { eq } from 'drizzle-orm';

// Validation schemas
const tierSchema = z.enum(['Basic', 'Professional', 'Advanced', 'Enterprise']);

const pricingRequestSchema = z.object({
  tier: tierSchema,
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
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
        customerEmail: input.customerEmail,
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
        totalPrice: pricing.totalPrice,
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
   * List all quotes (with pagination and filters)
   */
  listQuotes: protectedProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(100).default(25),
      search: z.string().optional(),
      status: z.enum(['draft', 'sent', 'accepted', 'rejected']).optional(),
      tier: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const { page, pageSize } = input;
      const offset = (page - 1) * pageSize;
      
      // Get quotes with pagination (simplified - no filtering for now)
      const quotes = await db
        .select()
        .from(pricingQuotes)
        .orderBy(pricingQuotes.createdAt)
        .limit(pageSize)
        .offset(offset);
      
      // Get total count
      const allQuotes = await db.select().from(pricingQuotes);
      
      return {
        quotes,
        total: allQuotes.length,
        page,
        pageSize,
      };
    }),
  
  /**
   * Update quote status
   */
  updateQuoteStatus: protectedProcedure
    .input(z.object({
      quoteId: z.number(),
      status: z.enum(['draft', 'sent', 'accepted', 'rejected']),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .update(pricingQuotes)
        .set({ status: input.status })
        .where(eq(pricingQuotes.id, input.quoteId));
      
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
  getTiers: protectedProcedure.query(() => {
    return Object.values(['Basic', 'Professional', 'Advanced', 'Enterprise']).map(tier => 
      getTierDefinition(tier as Tier)
    );
  }),

  /**
   * Generate Stripe invoice for a quote
   */
  generateInvoice: protectedProcedure
    .input(z.object({
      quoteId: z.number(),
      customerEmail: z.string().email(),
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
      
      // Recalculate pricing to get breakdown
      const pricing = calculatePricing({
        tier: quote.tier as Tier,
        users: quote.users,
        suppliers: quote.suppliers,
        protocols: quote.protocols,
        sites: quote.sites,
        partnerTypes: quote.partnerTypes,
        erpIntegration: quote.erpIntegration === 1,
        esrsSupport: quote.esrsSupport === 1,
        supportPremium: quote.supportPremium === 1,
        termYears: quote.termYears,
        currency: quote.currency,
      });
      
      // Create Stripe invoice
      const invoice = await createStripeInvoice({
        customerName: quote.customerName || 'Unknown Customer',
        customerEmail: input.customerEmail,
        lineItems: pricing.breakdown.map(item => ({
          description: item.label,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
        totalAmount: quote.totalPrice,
        currency: quote.currency,
        notes: quote.notes || undefined,
      });
      
      // Update quote with Stripe invoice info
      await db
        .update(pricingQuotes)
        .set({
          stripeInvoiceId: invoice.invoiceId,
          stripeInvoiceNumber: invoice.invoiceNumber,
          stripePaymentLink: invoice.paymentLink,
          status: 'sent',
        })
        .where(eq(pricingQuotes.id, input.quoteId));
      
      return invoice;
    }),

  /**
   * Export quote as PDF proposal
   */
  exportPDF: protectedProcedure
    .input(z.object({
      quoteId: z.number(),
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
      
      // Recalculate pricing to get breakdown
      const pricing = calculatePricing({
        tier: quote.tier as Tier,
        users: quote.users,
        suppliers: quote.suppliers,
        protocols: quote.protocols,
        sites: quote.sites,
        partnerTypes: quote.partnerTypes,
        erpIntegration: quote.erpIntegration === 1,
        esrsSupport: quote.esrsSupport === 1,
        supportPremium: quote.supportPremium === 1,
        termYears: quote.termYears,
        currency: quote.currency,
      });
      
      // Get tier features
      const tierDef = getTierDefinition(quote.tier as Tier);
      
      // Generate PDF
      const pdfBuffer = await generatePDFProposal({
        quoteId: quote.id,
        customerName: quote.customerName || 'Unknown Customer',
        customerEmail: quote.customerEmail || undefined,
        industry: quote.industry || undefined,
        region: quote.region || undefined,
        tier: quote.tier,
        annualPrice: quote.annualPrice,
        totalPrice: quote.totalPrice,
        termYears: quote.termYears,
        currency: quote.currency,
        breakdown: pricing.breakdown,
        features: tierDef.features,
        createdAt: quote.createdAt,
      });
      
      // Return PDF as base64
      return {
        data: pdfBuffer.toString('base64'),
        filename: `intelleges-proposal-${quote.id}.pdf`,
        mimeType: 'application/pdf',
      };
    }),
});

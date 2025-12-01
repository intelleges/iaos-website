import Stripe from 'stripe';
import { ENV } from '../_core/env';

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export interface InvoiceLineItem {
  description: string;
  amount: number; // in cents
  quantity?: number;
}

export interface CreateInvoiceParams {
  customerEmail: string;
  customerName: string;
  lineItems: InvoiceLineItem[];
  metadata?: Record<string, string>;
  dueDate?: Date;
}

/**
 * Create or retrieve a Stripe customer by email
 */
async function getOrCreateCustomer(email: string, name: string): Promise<Stripe.Customer> {
  // Search for existing customer
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return await stripe.customers.create({
    email,
    name,
  });
}

/**
 * Create a Stripe invoice from pricing quote
 * Returns invoice ID and payment link
 */
export async function createStripeInvoice(params: CreateInvoiceParams): Promise<{
  invoiceId: string;
  invoiceNumber: string | null;
  paymentLink: string;
  amount: number;
  status: string;
}> {
  // Get or create customer
  const customer = await getOrCreateCustomer(params.customerEmail, params.customerName);

  // Create invoice
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    collection_method: 'send_invoice',
    days_until_due: params.dueDate
      ? Math.ceil((params.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 30,
    metadata: params.metadata || {},
    auto_advance: false, // Don't auto-finalize
  });

  // Add line items to invoice
  for (const item of params.lineItems) {
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: item.amount,
      currency: 'usd',
      description: item.description,
      quantity: item.quantity || 1,
    });
  }

  // Finalize the invoice
  const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

  return {
    invoiceId: finalizedInvoice.id,
    invoiceNumber: finalizedInvoice.number,
    paymentLink: finalizedInvoice.hosted_invoice_url || '',
    amount: finalizedInvoice.amount_due,
    status: finalizedInvoice.status || 'draft',
  };
}

/**
 * Get invoice status from Stripe
 */
export async function getInvoiceStatus(invoiceId: string): Promise<{
  status: string;
  paid: boolean;
  amountPaid: number;
  amountDue: number;
}> {
  const invoice = await stripe.invoices.retrieve(invoiceId);

  return {
    status: invoice.status || 'draft',
    paid: invoice.paid,
    amountPaid: invoice.amount_paid,
    amountDue: invoice.amount_due,
  };
}

/**
 * Send invoice email to customer
 */
export async function sendInvoiceEmail(invoiceId: string): Promise<void> {
  await stripe.invoices.sendInvoice(invoiceId);
}

/**
 * Void/cancel an invoice
 */
export async function voidInvoice(invoiceId: string): Promise<void> {
  await stripe.invoices.voidInvoice(invoiceId);
}

/**
 * Stripe invoice generation for pricing quotes
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreateInvoiceRequest {
  customerName: string;
  customerEmail: string;
  lineItems: InvoiceLineItem[];
  totalAmount: number;
  currency: string;
  notes?: string;
}

export interface CreateInvoiceResult {
  invoiceId: string;
  invoiceNumber: string;
  paymentLink: string;
  hostedInvoiceUrl: string;
}

/**
 * Create a Stripe invoice for a quote
 */
export async function createStripeInvoice(
  request: CreateInvoiceRequest
): Promise<CreateInvoiceResult> {
  // Create or retrieve customer
  const customers = await stripe.customers.list({
    email: request.customerEmail,
    limit: 1,
  });

  let customer: Stripe.Customer;
  if (customers.data.length > 0) {
    customer = customers.data[0];
  } else {
    customer = await stripe.customers.create({
      email: request.customerEmail,
      name: request.customerName,
    });
  }

  // Create invoice
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    collection_method: 'send_invoice',
    days_until_due: 30,
    description: request.notes || 'Intelleges Enterprise Compliance Platform',
    metadata: {
      source: 'pricing_calculator',
      customer_name: request.customerName,
    },
  });

  // Add line items to invoice
  for (const item of request.lineItems) {
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      description: item.description,
      amount: Math.round(item.total * 100), // Convert to cents
      currency: request.currency.toLowerCase(),
    });
  }

  // Finalize invoice
  const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

  // Get hosted invoice URL
  const hostedInvoiceUrl = finalizedInvoice.hosted_invoice_url || '';
  const paymentLink = hostedInvoiceUrl;

  return {
    invoiceId: finalizedInvoice.id,
    invoiceNumber: finalizedInvoice.number || '',
    paymentLink,
    hostedInvoiceUrl,
  };
}

/**
 * Get invoice status
 */
export async function getInvoiceStatus(invoiceId: string): Promise<string> {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  return invoice.status || 'unknown';
}

/**
 * Send invoice email
 */
export async function sendInvoiceEmail(invoiceId: string): Promise<void> {
  await stripe.invoices.sendInvoice(invoiceId);
}

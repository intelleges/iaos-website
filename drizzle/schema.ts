import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lead capture table for tracking whitepaper/resource downloads
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  emailVerified: int("emailVerified").default(0).notNull(), // 0 = not verified, 1 = verified
  verificationToken: varchar("verificationToken", { length: 64 }),
  verificationExpiry: timestamp("verificationExpiry"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Download tracking table for rate limiting
 */
export const downloads = mysqlTable("downloads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }).notNull(), // IPv6 max length
  resourceName: varchar("resourceName", { length: 255 }).notNull(),
  resourceUrl: varchar("resourceUrl", { length: 512 }).notNull(),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
});

export type Download = typeof downloads.$inferSelect;
export type InsertDownload = typeof downloads.$inferInsert;

/**
 * Document downloads table for tracking all document downloads with detailed metadata
 */
export const documentDownloads = mysqlTable("documentDownloads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  role: varchar("role", { length: 255 }),
  documentTitle: varchar("documentTitle", { length: 500 }).notNull(),
  documentUrl: varchar("documentUrl", { length: 500 }).notNull(),
  documentType: varchar("documentType", { length: 100 }).notNull(), // 'capability', 'protocol', 'whitepaper'
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
  followUpEmailSent: int("followUpEmailSent").default(0).notNull(), // 0 = not sent, 1 = sent
  followUpEmailSentAt: timestamp("followUpEmailSentAt"),
});

export type DocumentDownload = typeof documentDownloads.$inferSelect;
export type InsertDocumentDownload = typeof documentDownloads.$inferInsert;

/**
 * Scheduled emails table for delayed email automation
 */
export const scheduledEmails = mysqlTable("scheduledEmails", {
  id: int("id").autoincrement().primaryKey(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  recipientName: varchar("recipientName", { length: 255 }),
  emailType: varchar("emailType", { length: 100 }).notNull(), // 'document_followup', 'newsletter', etc.
  subject: varchar("subject", { length: 500 }).notNull(),
  htmlContent: text("htmlContent").notNull(),
  scheduledFor: timestamp("scheduledFor").notNull(),
  sent: int("sent").default(0).notNull(), // 0 = not sent, 1 = sent
  sentAt: timestamp("sentAt"),
  failed: int("failed").default(0).notNull(), // 0 = not failed, 1 = failed
  failureReason: text("failureReason"),
  retryCount: int("retryCount").default(0).notNull(),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ScheduledEmail = typeof scheduledEmails.$inferSelect;
export type InsertScheduledEmail = typeof scheduledEmails.$inferInsert;

/**
 * Lead qualification attempts table for tracking Calendly access gating
 */
export const leadQualificationAttempts = mysqlTable("leadQualificationAttempts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  website: varchar("website", { length: 512 }),
  country: varchar("country", { length: 128 }),
  industry: varchar("industry", { length: 255 }),
  employeeCount: int("employeeCount"),
  revenueBand: varchar("revenueBand", { length: 128 }),
  score: int("score").notNull(),
  qualified: int("qualified").notNull(), // 1 = qualified, 0 = not qualified
  reasons: text("reasons").notNull(), // JSON-encoded array of strings
  rawEnrichment: text("rawEnrichment"), // JSON blob of enrichment response (optional)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadQualificationAttempt = typeof leadQualificationAttempts.$inferSelect;
export type InsertLeadQualificationAttempt = typeof leadQualificationAttempts.$inferInsert;
/**
 * Email events table for tracking SendGrid webhook events
 */
export const emailEvents = mysqlTable("emailEvents", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  eventType: varchar("eventType", { length: 50 }).notNull(), // open, bounce, click, delivered, etc.
  reason: text("reason"),
  sgEventId: varchar("sgEventId", { length: 255 }),
  sgMessageId: varchar("sgMessageId", { length: 255 }),
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailEvent = typeof emailEvents.$inferSelect;
export type InsertEmailEvent = typeof emailEvents.$inferInsert;

/**
 * Email status table for aggregated email engagement metrics
 */
export const emailStatus = mysqlTable("emailStatus", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  lastEvent: varchar("lastEvent", { length: 50 }),
  lastEventAt: timestamp("lastEventAt"),
  bounce: int("bounce").default(0).notNull(),
  spam: int("spam").default(0).notNull(),
  delivered: int("delivered").default(0).notNull(),
  opened: int("opened").default(0).notNull(),
  clicked: int("clicked").default(0).notNull(),
  unsubscribed: int("unsubscribed").default(0).notNull(),
  // Suppression fields for "Do Not Email" system
  isSuppressed: int("isSuppressed").default(0).notNull(), // 0 = not suppressed, 1 = suppressed
  suppressionReason: varchar("suppressionReason", { length: 100 }), // 'bounce', 'spam', 'unsubscribe', 'manual'
  suppressedAt: timestamp("suppressedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailStatus = typeof emailStatus.$inferSelect;
export type InsertEmailStatus = typeof emailStatus.$inferInsert;

/**
 * Pricing quotes table for internal sales pricing calculator
 * Stores configuration-based pricing quotes for enterprise customers
 */
export const pricingQuotes = mysqlTable("pricingQuotes", {
  id: int("id").autoincrement().primaryKey(),
  
  // Customer information
  customerName: varchar("customerName", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  region: varchar("region", { length: 255 }),
  
  // Tier and configuration
  tier: varchar("tier", { length: 50 }).notNull(), // Basic, Professional, Advanced, Enterprise
  users: int("users").notNull(),
  suppliers: int("suppliers").notNull(),
  protocols: int("protocols").notNull(),
  sites: int("sites").notNull(),
  partnerTypes: int("partnerTypes").notNull(),
  
  // Feature flags
  erpIntegration: int("erpIntegration").default(0).notNull(), // 0 = no, 1 = yes
  esrsSupport: int("esrsSupport").default(0).notNull(), // 0 = no, 1 = yes
  supportPremium: int("supportPremium").default(0).notNull(), // 0 = no, 1 = yes
  
  // Pricing breakdown (annual)
  basePrice: int("basePrice").notNull(),
  usersPrice: int("usersPrice").notNull(),
  suppliersPrice: int("suppliersPrice").notNull(),
  protocolsPrice: int("protocolsPrice").notNull(),
  sitesPrice: int("sitesPrice").notNull(),
  partnerTypesPrice: int("partnerTypesPrice").notNull(),
  erpIntegrationPrice: int("erpIntegrationPrice").notNull(),
  esrsSupportPrice: int("esrsSupportPrice").notNull(),
  supportPremiumPrice: int("supportPremiumPrice").notNull(),
  annualPrice: int("annualPrice").notNull(),
  
  // Contract terms
  termYears: int("termYears").default(1).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  
  // Quote status
  status: varchar("status", { length: 50 }).default("draft").notNull(), // draft, sent, won, lost
  
  // Stripe integration
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  
  // CRM integration (optional)
  crmOpportunityId: varchar("crmOpportunityId", { length: 255 }),
  
  // Metadata
  notes: text("notes"),
  createdBy: int("createdBy"), // user ID who created the quote
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PricingQuote = typeof pricingQuotes.$inferSelect;
export type InsertPricingQuote = typeof pricingQuotes.$inferInsert;

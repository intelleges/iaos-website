import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  openId: text("open_id").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documentDownloads = pgTable("document_downloads", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  role: varchar("role", { length: 255 }),
  documentTitle: varchar("document_title", { length: 500 }).notNull(),
  documentUrl: varchar("document_url", { length: 500 }).notNull(),
  documentType: varchar("document_type", { length: 100 }).notNull(), // 'capability', 'protocol', 'whitepaper'
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
  followUpEmailSent: boolean("follow_up_email_sent").default(false).notNull(),
  followUpEmailSentAt: timestamp("follow_up_email_sent_at"),
});

export const scheduledEmails = pgTable("scheduled_emails", {
  id: text("id").primaryKey(),
  recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
  recipientName: varchar("recipient_name", { length: 255 }),
  emailType: varchar("email_type", { length: 100 }).notNull(), // 'document_followup', 'newsletter', etc.
  subject: varchar("subject", { length: 500 }).notNull(),
  htmlContent: text("html_content").notNull(),
  scheduledFor: timestamp("scheduled_for").notNull(),
  sent: boolean("sent").default(false).notNull(),
  sentAt: timestamp("sent_at"),
  failed: boolean("failed").default(false).notNull(),
  failureReason: text("failure_reason"),
  retryCount: integer("retry_count").default(0).notNull(),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

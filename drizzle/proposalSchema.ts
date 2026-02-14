// drizzle/proposalSchema.ts
// ============================================================================
// ENTERPRISE CONFIGURATOR — Proposal Pipeline Schema
// INT.DOC.91 v1.1 — Section 3.2
// 
// Add this file alongside your existing drizzle/schema.ts
// Then import and merge into your schema exports.
//
// TABLES:
//   enterpriseProposals  — Sales pipeline proposals from configurator
//   proposalEvents       — Audit trail for every status change
// ============================================================================

import {
  mysqlTable,
  varchar,
  int,
  decimal,
  boolean,
  json,
  timestamp,
  mysqlEnum,
  text,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ============================================================================
// enterpriseProposals
// ============================================================================
export const enterpriseProposals = mysqlTable("enterpriseProposals", {
  id: int("id").primaryKey().autoincrement(),
  
  // --- Status Lifecycle ---
  status: mysqlEnum("status", [
    "DRAFT",
    "SENT",
    "ACCEPTED",
    "PAID",
    "PROVISIONED",
    "REJECTED",
  ]).notNull().default("DRAFT"),

  // --- Tier & Pricing ---
  tierKey: varchar("tierKey", { length: 50 }).notNull(),        // STARTER | FOUNDATION | GROWTH | COMMAND
  tierName: varchar("tierName", { length: 100 }).notNull(),     // "Enterprise Foundation"
  priceAnnual: decimal("priceAnnual", { precision: 12, scale: 2 }).notNull(),

  // --- Configuration Snapshot ---
  configUsers: int("configUsers").notNull(),
  configSuppliers: int("configSuppliers").notNull(),
  configGroups: int("configGroups").notNull(),
  configProtocols: json("configProtocols").notNull(),            // string[] of protocolRegistry.acronym values
  multiJurisdiction: boolean("multiJurisdiction").notNull().default(false),

  // --- Contact Info ---
  contactName: varchar("contactName", { length: 200 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 200 }).notNull(),
  contactCompany: varchar("contactCompany", { length: 200 }).notNull(),
  contactRole: varchar("contactRole", { length: 100 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 50 }),

  // --- Payment (Phase 2) ---
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  poDocumentUrl: varchar("poDocumentUrl", { length: 500 }),
  poApprovedAt: timestamp("poApprovedAt"),
  poApprovedBy: varchar("poApprovedBy", { length: 200 }),

  // --- PDF ---
  pdfUrl: varchar("pdfUrl", { length: 500 }),

  // --- FCMS Integration (Phase 3) ---
  fcmsEnterpriseId: int("fcmsEnterpriseId"),

  // --- Timestamps ---
  paidAt: timestamp("paidAt"),
  provisionedAt: timestamp("provisionedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
});

// ============================================================================
// proposalEvents (audit trail)
// ============================================================================
export const proposalEvents = mysqlTable("proposalEvents", {
  id: int("id").primaryKey().autoincrement(),
  proposalId: int("proposalId").notNull(),
  eventType: varchar("eventType", { length: 50 }).notNull(),    // CREATED | SENT | VIEWED | PAID | PROVISIONED | REJECTED
  metadata: json("metadata"),                                     // { ip, userAgent, stripeId, etc. }
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// ============================================================================
// Relations
// ============================================================================
export const enterpriseProposalsRelations = relations(enterpriseProposals, ({ many }) => ({
  events: many(proposalEvents),
}));

export const proposalEventsRelations = relations(proposalEvents, ({ one }) => ({
  proposal: one(enterpriseProposals, {
    fields: [proposalEvents.proposalId],
    references: [enterpriseProposals.id],
  }),
}));

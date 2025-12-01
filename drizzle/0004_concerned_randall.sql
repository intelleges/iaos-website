ALTER TABLE `pricingQuotes` ADD `expiresAt` timestamp;--> statement-breakpoint
ALTER TABLE `pricingQuotes` ADD `expirationReminderSent` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `pricingQuotes` ADD `expirationEmailSent` int DEFAULT 0 NOT NULL;
ALTER TABLE `emailStatus` ADD `isSuppressed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `emailStatus` ADD `suppressionReason` varchar(100);--> statement-breakpoint
ALTER TABLE `emailStatus` ADD `suppressedAt` timestamp;
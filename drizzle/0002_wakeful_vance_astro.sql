CREATE TABLE `emailSends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`emailType` enum('executive_summary','day3_followup','day7_followup') NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('sent','failed','bounced') NOT NULL DEFAULT 'sent',
	`errorMessage` text,
	CONSTRAINT `emailSends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scheduledEmails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`emailType` enum('day3_followup','day7_followup') NOT NULL,
	`scheduledFor` timestamp NOT NULL,
	`status` enum('pending','sent','failed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`sentAt` timestamp,
	`errorMessage` text,
	CONSTRAINT `scheduledEmails_id` PRIMARY KEY(`id`)
);

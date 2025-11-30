CREATE TABLE `documentDownloads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`company` varchar(255),
	`role` varchar(255),
	`documentTitle` varchar(500) NOT NULL,
	`documentUrl` varchar(500) NOT NULL,
	`documentType` varchar(100) NOT NULL,
	`downloadedAt` timestamp NOT NULL DEFAULT (now()),
	`followUpEmailSent` int NOT NULL DEFAULT 0,
	`followUpEmailSentAt` timestamp,
	CONSTRAINT `documentDownloads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scheduledEmails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recipientEmail` varchar(320) NOT NULL,
	`recipientName` varchar(255),
	`emailType` varchar(100) NOT NULL,
	`subject` varchar(500) NOT NULL,
	`htmlContent` text NOT NULL,
	`scheduledFor` timestamp NOT NULL,
	`sent` int NOT NULL DEFAULT 0,
	`sentAt` timestamp,
	`failed` int NOT NULL DEFAULT 0,
	`failureReason` text,
	`retryCount` int NOT NULL DEFAULT 0,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scheduledEmails_id` PRIMARY KEY(`id`)
);

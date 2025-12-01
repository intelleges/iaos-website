CREATE TABLE `emailEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`reason` text,
	`sgEventId` varchar(255),
	`sgMessageId` varchar(255),
	`timestamp` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emailEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `emailStatus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`lastEvent` varchar(50),
	`lastEventAt` timestamp,
	`bounce` int NOT NULL DEFAULT 0,
	`spam` int NOT NULL DEFAULT 0,
	`delivered` int NOT NULL DEFAULT 0,
	`opened` int NOT NULL DEFAULT 0,
	`clicked` int NOT NULL DEFAULT 0,
	`unsubscribed` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emailStatus_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailStatus_email_unique` UNIQUE(`email`)
);

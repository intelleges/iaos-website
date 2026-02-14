CREATE TABLE `enterpriseProposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('DRAFT','SENT','ACCEPTED','PAID','PROVISIONED','REJECTED') NOT NULL DEFAULT 'DRAFT',
	`tierKey` varchar(50) NOT NULL,
	`tierName` varchar(100) NOT NULL,
	`priceAnnual` decimal(12,2) NOT NULL,
	`configUsers` int NOT NULL,
	`configSuppliers` int NOT NULL,
	`configGroups` int NOT NULL,
	`configProtocols` json NOT NULL,
	`multiJurisdiction` boolean NOT NULL DEFAULT false,
	`contactName` varchar(200) NOT NULL,
	`contactEmail` varchar(200) NOT NULL,
	`contactCompany` varchar(200) NOT NULL,
	`contactRole` varchar(100) NOT NULL,
	`contactPhone` varchar(50),
	`stripeSessionId` varchar(255),
	`stripePaymentId` varchar(255),
	`poDocumentUrl` varchar(500),
	`poApprovedAt` timestamp,
	`poApprovedBy` varchar(200),
	`pdfUrl` varchar(500),
	`fcmsEnterpriseId` int,
	`paidAt` timestamp,
	`provisionedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enterpriseProposals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proposalEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposalId` int NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `proposalEvents_id` PRIMARY KEY(`id`)
);

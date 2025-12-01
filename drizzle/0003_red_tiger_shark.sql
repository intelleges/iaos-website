CREATE TABLE `leadQualificationAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(255) NOT NULL,
	`title` varchar(255),
	`website` varchar(512),
	`country` varchar(128),
	`industry` varchar(255),
	`employeeCount` int,
	`revenueBand` varchar(128),
	`score` int NOT NULL,
	`qualified` int NOT NULL,
	`reasons` text NOT NULL,
	`rawEnrichment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leadQualificationAttempts_id` PRIMARY KEY(`id`)
);

CREATE TABLE `codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text(12) NOT NULL,
	`event_id` integer NOT NULL,
	`participant_id` integer NOT NULL,
	`code` text(36) NOT NULL,
	`mail_sent_at` integer,
	`scanned_at` integer,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `codes_public_id_unique` ON `codes` (`public_id`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text(12) NOT NULL,
	`slug` text(255) NOT NULL,
	`title` text(255) NOT NULL,
	`subtitle` text NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL,
	`location` text,
	`questions` text,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_public_id_unique` ON `events` (`public_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE TABLE `participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text(12) NOT NULL,
	`event_id` integer NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`phone` text(255),
	`street` text,
	`house_number` text,
	`comment` text,
	`questions` text,
	`adults` integer DEFAULT 0,
	`minors` integer DEFAULT 0,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `participants_public_id_unique` ON `participants` (`public_id`);
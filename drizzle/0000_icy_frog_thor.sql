CREATE TABLE `habitLogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`completed` integer DEFAULT true,
	`habit_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text DEFAULT '#0099cc',
	`description` text DEFAULT '',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);

PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habitLogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`completed` integer DEFAULT true,
	`habit_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_habitLogs`("id", "date", "completed", "habit_id", "created_at") SELECT "id", "date", "completed", "habit_id", "created_at" FROM `habitLogs`;--> statement-breakpoint
DROP TABLE `habitLogs`;--> statement-breakpoint
ALTER TABLE `__new_habitLogs` RENAME TO `habitLogs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
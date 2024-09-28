import { relations, sql } from "drizzle-orm";
import { type PgTableFn, pgEnum, pgTable, pgTableCreator, text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const createTable: PgTableFn = pgTableCreator((name: string): string => `yuuki_${name}`);

/* ---------------------------------- USER ---------------------------------- */

export const users = pgTable(
    "user",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        discordId: varchar("discord_id").notNull(),
    },
    (user) => ({
        discordIdUidx: uniqueIndex("user_discord_id_uidx").on(user.discordId),
    }),
);

/* ---------------------------------- GUILD --------------------------------- */

export const guilds = pgTable("guild", {
    id: uuid("id").defaultRandom().primaryKey(),
    discordId: varchar("discord_id").notNull().unique(),
});

export const guildsRelations = relations(guilds, ({ one }) => ({
    guildSettings: one(guildSettings),
}));

export const guildSettings = pgTable("guild_setting", {
    id: uuid("id").defaultRandom().primaryKey(),
    guildId: varchar("guild_id")
        .references(() => guilds.discordId)
        .unique(),
    prefix: varchar("prefix").notNull().default("imperia!"),
    language: varchar("language").notNull().default("en-US"),
    disabledCommands: text("disabled_commands").array().notNull().default(sql`'{}'::text[]`),
});

export const guildSettingsRelations = relations(guildSettings, ({ one }) => ({
    guild: one(guilds, { fields: [guildSettings.guildId], references: [guilds.discordId] }),
}));

/* -------------------------------------------------------------------------- */

export const blacklistTypes = pgEnum("blacklist_types", ["user", "guild"]);
export type BlacklistType = (typeof blacklistTypes.enumValues)[number];

export const blacklistEntities = pgTable(
    "blacklist_entity",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        entityId: varchar("entity_id").notNull(),
        entityType: blacklistTypes("entity_type").notNull(),
    },
    (blacklistEntity) => ({
        entityIdTypeUidx: uniqueIndex("blacklist_entity_entity_id_type_uidx").on(
            blacklistEntity.entityId,
            blacklistEntity.entityType,
        ),
    }),
);

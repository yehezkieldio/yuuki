import { UserError } from "@sapphire/framework";

import { database, eq } from "@yuuki/database";
import { guildSettings } from "@yuuki/database/schema";
import { Service } from "@yuuki/plugin-custom-stores";

import { YuukiIdentifiers } from "#lib/extensions/constants/identifiers";

type SelectGuildSettings = typeof guildSettings.$inferSelect;
export type GuildSettings = Omit<SelectGuildSettings, "id">;

export class GuildService extends Service {
    constructor(context: Service.LoaderContext, options: Service.Options) {
        super(context, {
            ...options,
            name: "guild",
        });
    }

    /**
     * Get the guild settings from the database.
     * @param guildId The guild ID to get the settings from.
     * @returns The guild settings.
     */
    public async getLanguageCode(guildId: string) {
        const [result] = await database
            .select({
                language: guildSettings.language,
            })
            .from(guildSettings)
            .where(eq(guildSettings.guildId, guildId));

        if (!result) {
            throw new UserError({
                identifier: YuukiIdentifiers.ServiceError,
                message: "Failed to get guild language code.",
            });
        }

        return result.language;
    }

    /**
     * Get the message prefix for a guild.
     * @param guildId The guild ID to get the message prefix from.
     * @returns The message prefix.
     */
    public async getMessagePrefix(guildId: string) {
        const [result] = await database
            .select({
                prefix: guildSettings.prefix,
            })
            .from(guildSettings)
            .where(eq(guildSettings.guildId, guildId));

        if (!result) {
            throw new UserError({
                identifier: YuukiIdentifiers.ServiceError,
                message: "Failed to get guild message prefix.",
            });
        }

        return result.prefix;
    }
}

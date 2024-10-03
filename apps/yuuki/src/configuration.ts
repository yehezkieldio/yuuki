import { envDiscord } from "@yuuki/environment/discord";
import { LogLevel, YuukiLogger } from "@yuuki/logger";

import { container } from "@sapphire/pieces";
import type { InternationalizationContext } from "@sapphire/plugin-i18next";
import { Time } from "@sapphire/time-utilities";
import { ActivityType, type CommandInteraction, GatewayIntentBits, type Message, Partials } from "discord.js";

import type { YuukiClientOptions } from "#lib/extensions/client";
import { DEVELOPERS } from "#lib/extensions/constants/development";

export const configuration: YuukiClientOptions = {
    allowedMentions: {
        parse: [],
        users: [],
        roles: [],
        repliedUser: true,
    },
    defaultCooldown: {
        delay: Time.Second * 2,
        filteredUsers: DEVELOPERS,
    },
    defaultPrefix: envDiscord.DEFAULT_PREFIX,
    fetchPrefix: async (context: Message | CommandInteraction): Promise<string> => {
        const guildId: string = context.guildId ?? (context.guild?.id as string);
        container.logger.debug(`YuukiConfiguration: Fetching prefix for guild ${guildId}.`);

        return envDiscord.DEFAULT_PREFIX;
        // return container.utilities.guild.getPrefix(guildId);
    },
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ],
    i18n: {
        fetchLanguage: async (context: InternationalizationContext): Promise<string | null> => {
            if (!context.guild) return envDiscord.DEFAULT_LANGUAGE;
            container.logger.debug(`YuukiConfiguration: Fetching language for guild ${context.guild.id}.`);

            return container.services.guild.getLanguageCode(context.guild.id);
        },
    },
    loadApplicationCommandRegistriesStatusListeners: envDiscord.NODE_ENV === "development",
    loadDefaultErrorListeners: envDiscord.NODE_ENV === "development",
    loadSubcommandErrorListeners: envDiscord.NODE_ENV === "development",
    loadMessageCommandListeners: true,
    logger: {
        instance: new YuukiLogger(envDiscord.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info),
        level: envDiscord.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info,
    },
    overrideApplicationCommandsRegistries: envDiscord.NODE_ENV === "development",
    partials: [Partials.Message, Partials.User, Partials.GuildMember],
    presence: {
        activities: [
            {
                type: ActivityType.Listening,
                name: "reality, the manifested. ✨",
            },
        ],
        status: "dnd",
    },
    typing: true,
};

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env } from "./env";

/**
 * The environment variables for the Discord bot.
 */
export const envDiscord = {
    ...env,

    ...createEnv({
        server: {
            DISCORD_TOKEN: z.string(),
            DEFAULT_PREFIX: z.string().default("yuuki!"),
            DEFAULT_LANGUAGE: z.string().default("en-US"),
        },
        runtimeEnv: {
            DISCORD_TOKEN: process.env.DISCORD_TOKEN,
            DEFAULT_PREFIX: process.env.DEFAULT_PREFIX,
            DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
        },
    }),
} as const;

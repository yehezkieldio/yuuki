process.env = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV ?? "development",
};

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * The initial environment variables for the project, any derived environment variables should be extended from this.
 */
export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        DATABASE_URL: z.string().url(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
    },
    emptyStringAsUndefined: true,
    skipValidation: process.env.NODE_ENV === "test",
});

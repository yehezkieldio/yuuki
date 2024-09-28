import { env } from "@yuuki/environment";
import type { Config } from "drizzle-kit";

export default {
    schema: "./schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    tablesFilter: ["yuuki_*"],
    out: "./migrations",
} satisfies Config;

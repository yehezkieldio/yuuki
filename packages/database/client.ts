import { env } from "@yuuki/environment";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { LogLevel, YuukiLogger } from "@yuuki/logger";
import { DefaultLogger } from "drizzle-orm";
import { YuukiDatabaseLogger } from "./logger";
import * as schema from "./schema";

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
    connection: postgres.Sql | undefined;
};

export const connection: postgres.Sql = globalForDb.connection ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.connection = connection;

const databaseLogger = new DefaultLogger({
    writer: new YuukiDatabaseLogger(new YuukiLogger(env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info)),
});

export const database: PostgresJsDatabase<typeof schema> = drizzle(connection, {
    schema,
    logger: env.NODE_ENV === "development" ? databaseLogger : undefined,
});

export * from "drizzle-orm";
export type Database = typeof database;

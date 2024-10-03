import { connection, database } from "@yuuki/database";
import { envDiscord } from "@yuuki/environment/discord";

import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    type SapphireClientOptions,
    container,
} from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export interface YuukiClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
}

/**
 * A custom client for the Yuuki bot.
 */
export class YuukiClient extends SapphireClient {
    /**
     * Creates a new Yuuki client.
     * @param options The options for the client.
     */
    constructor(options: YuukiClientOptions) {
        super(options);

        container.logger.getConsolaInstance().log("\n\n\nCAST IN THE NAME OF GOD: YE NOT GUILTY\n\n\n");

        container.logger.info(`YuukiClient: Running on a ${envDiscord.NODE_ENV} environment.`);

        if (options.overrideApplicationCommandsRegistries === true) {
            container.logger.info(
                "YuukiClient: Overriding the default behavior for application commands registries to BulkOverwrite.",
            );

            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }
    }

    public override async login(token: string): Promise<string> {
        // Verify if there is a connection and the tables are created in the database
        container.logger.info("YuukiClient: Connected to the PostgreSQL database.");
        try {
            container.logger.info("YuukiClient: Testing the PostgresQL database connection...");
            await database.query.users.findFirst();
            container.logger.info("YuukiClient: PostgresQL database connection test successful.");
        } catch (error) {
            container.logger.error("YuukiClient: An error occurred with the Postgres database, see below:");
            container.logger.error(error);

            process.exit(1);
        }
        container.logger.info("YuukiClient: PostgresQL database is ready for use.");

        return super.login(token);
    }

    public override async destroy(): Promise<void> {
        await connection.end({
            timeout: 3,
        });

        return super.destroy();
    }
}

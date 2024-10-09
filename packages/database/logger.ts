import type { YuukiLogger } from "@yuuki/logger";
import type { LogWriter } from "drizzle-orm";

/**
 * A custom drizzle log writer implementation for the Yuuki database.
 */
export class YuukiDatabaseLogger implements LogWriter {
    private readonly logger: YuukiLogger;

    /**
     * Creates a new Yuuki database logger, using a provided Yuuki logger.
     * @param logger The Yuuki logger to use.
     */
    constructor(logger: YuukiLogger) {
        this.logger = logger;
    }

    public write(message: string): void {
        this.logger.debug(message);
    }
}

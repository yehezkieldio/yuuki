import { type ConsolaInstance, createConsola } from "consola";

export enum LogLevel {
    /**
     * The lowest log level, used when calling {@link ILogger.trace}.
     */
    Trace = 10,

    /**
     * The debug level, used when calling {@link ILogger.debug}.
     */
    Debug = 20,

    /**
     * The info level, used when calling {@link ILogger.info}.
     */
    Info = 30,

    /**
     * The warning level, used when calling {@link ILogger.warn}.
     */
    Warn = 40,

    /**
     * The error level, used when calling {@link ILogger.error}.
     */
    Error = 50,

    /**
     * The critical level, used when calling {@link ILogger.fatal}.
     */
    Fatal = 60,

    /**
     * An unknown or uncategorized level.
     */
    None = 100,
}

interface ILogger {
    /**
     * Checks whether a level is supported.
     * @param level The level to check.
     */
    has(level: LogLevel): boolean;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Trace} as level.
     * @param values The values to log.
     */
    trace(...values: readonly unknown[]): void;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Debug} as level.
     * @param values The values to log.
     */
    debug(...values: readonly unknown[]): void;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Info} as level.
     * @param values The values to log.
     */
    info(...values: readonly unknown[]): void;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Warn} as level.
     * @param values The values to log.
     */
    warn(...values: readonly unknown[]): void;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Error} as level.
     * @param values The values to log.
     */
    error(...values: readonly unknown[]): void;

    /**
     * Alias of {@link ILogger.write} with {@link LogLevel.Fatal} as level.
     * @param values The values to log.
     */
    fatal(...values: readonly unknown[]): void;

    /**
     * Writes the log message given a level and the value(s).
     * @param level The log level.
     * @param values The values to log.
     */
    write(level: LogLevel, ...values: readonly unknown[]): void;
}

/**
 * An inspired re-implementation of Sapphire's logger following the same structure.
 * @see {@link https://github.com/sapphiredev/framework/blob/main/src/lib/utils/logger/ILogger.ts|ILogger.ts}
 */
export class YuukiLogger implements ILogger {
    private readonly minLevel: LogLevel;
    private readonly consolaLevel: number;
    private withTimestamp: boolean;
    private instance: ConsolaInstance;

    /**
     * Creates a new logger instance.
     * @param minLevel The minimum level to log.
     */
    constructor(minLevel: LogLevel) {
        this.minLevel = minLevel;
        this.withTimestamp = false;

        this.consolaLevel = minLevel === LogLevel.Trace ? 5 : minLevel === LogLevel.Debug ? 4 : 3;

        this.instance = createConsola({
            level: this.consolaLevel,
            formatOptions: {
                colors: true,
                date: this.withTimestamp ?? false,
            },
        });
    }

    /**
     * Enables the timestamp in the logger.
     * @param withTimestamp
     * @returns
     */
    public setWithTimestamp(withTimestamp = true): this {
        this.withTimestamp = withTimestamp;
        this.instance = createConsola({
            level: this.consolaLevel,
            formatOptions: {
                colors: true,
                date: this.withTimestamp ?? true,
            },
        });

        return this;
    }

    /* -------------------------------------------------------------------------- */

    public has(level: LogLevel): boolean {
        return level >= this.minLevel;
    }

    public trace(...values: readonly unknown[]): void {
        this.write(LogLevel.Trace, ...values);
    }

    public debug(...values: readonly unknown[]): void {
        this.write(LogLevel.Debug, ...values);
    }

    public info(...values: readonly unknown[]): void {
        this.write(LogLevel.Info, ...values);
    }

    public warn(...values: readonly unknown[]): void {
        this.write(LogLevel.Warn, ...values);
    }

    public error(...values: readonly unknown[]): void {
        this.write(LogLevel.Error, ...values);
    }

    public fatal(...values: readonly unknown[]): void {
        this.write(LogLevel.Fatal, ...values);
    }

    public write(level: LogLevel, ...values: readonly unknown[]): void {
        if (!this.has(level)) return;
        const method = YuukiLogger.levels.get(level);
        if (typeof method === "string") this.instance[method](values.join(" "));
    }

    /* -------------------------------------------------------------------------- */

    protected static readonly levels = new Map<LogLevel, LogMethods>([
        [LogLevel.Trace, "trace"],
        [LogLevel.Debug, "debug"],
        [LogLevel.Info, "info"],
        [LogLevel.Warn, "warn"],
        [LogLevel.Error, "error"],
        [LogLevel.Fatal, "error"],
    ]);
}

type LogMethods = "trace" | "debug" | "info" | "warn" | "error";

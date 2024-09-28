/**
 * A custom error class for database errors, inspired by Sapphire's user error class.
 * @see {@link https://github.com/sapphiredev/framework/blob/main/src/lib/errors/UserError.ts|UserError.ts}
 */
export class DatabaseError extends Error {
    public readonly identifier: string;
    public readonly context: unknown;

    constructor({ identifier, message, context }: DatabaseError.Options) {
        super(message);

        this.name = "DatabaseError";
        this.identifier = identifier;
        this.context = context;
    }
}

export namespace DatabaseError {
    export interface Options {
        identifier: string;
        message: string;
        context?: unknown;
    }
}

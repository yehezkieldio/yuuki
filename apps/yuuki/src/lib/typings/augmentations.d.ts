import type { GuildService } from "#services/guild";

declare module "@sapphire/pieces" {
    interface Services {
        guild: GuildService;
    }

    interface Utilities {}

    interface Container {
        services: Services;
        utilities: Utilities;
    }
}

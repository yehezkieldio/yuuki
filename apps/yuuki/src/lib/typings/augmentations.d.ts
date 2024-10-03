import type { GuildService } from "#services/guild";
import type { ResponseService } from "#services/response";

declare module "@sapphire/pieces" {
    interface Services {
        response: ResponseService;
        guild: GuildService;
    }

    interface Utilities {}

    interface Container {
        services: Services;
        utilities: Utilities;
    }
}

import { Listener } from "@sapphire/framework";
import type { Client } from "discord.js";
import { YuukiEvents } from "#lib/extensions/constants/events";

export class ClientReadyListener extends Listener {
    constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: YuukiEvents.ClientReady,
        });
    }

    public async run(client: Client): Promise<void> {
        const user = client.user;
        if (!user) this.container.logger.error("ClientReadyListener: Client user is not available.");
        this.container.logger.info(`ClientReadyListener: Successfully logged in as ${user?.tag} (${user?.id})`);
    }
}

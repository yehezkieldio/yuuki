import { envDiscord } from "@yuuki/environment/discord";

import "@yuuki/plugin-custom-stores/register";
import "@sapphire/plugin-subcommands/register";
import "@sapphire/plugin-i18next/register";

import { YuukiClient } from "#lib/extensions/client";
import { configuration } from "./configuration";

export async function main(): Promise<void> {
    const client = new YuukiClient(configuration);
    await client.login(envDiscord.DISCORD_TOKEN);

    process.on("SIGINT", async (): Promise<void> => {
        await client.destroy().then((): never => {
            process.exit();
        });
    });
}

main().catch((error: unknown): never => {
    console.error(error);
    process.exit(1);
});

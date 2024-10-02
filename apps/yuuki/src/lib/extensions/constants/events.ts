import { Events as SapphireEvents } from "@sapphire/framework";
import { SubcommandPluginEvents } from "@sapphire/plugin-subcommands";

const Events = {};

export const YuukiEvents = {
    ...SapphireEvents,
    ...SubcommandPluginEvents,
    ...Events,
};

import { Subcommand, type SubcommandOptions } from "@sapphire/plugin-subcommands";

interface YuukiSubcommandOptions extends SubcommandOptions {
    tags: string[];
}

export abstract class YuukiSubcommand extends Subcommand {
    public tags: string[];

    protected constructor(context: Subcommand.LoaderContext, options: YuukiSubcommandOptions) {
        super(context, {
            ...options,
        });

        this.tags = options.tags;
    }
}

export declare namespace YuukiSubcommand {
    type Options = YuukiSubcommandOptions;
    type JSON = Subcommand.JSON;
    type LoaderContext = Subcommand.LoaderContext;
    type RunInTypes = Subcommand.RunInTypes;
    type ChatInputCommandInteraction = Subcommand.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Subcommand.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Subcommand.AutocompleteInteraction;
    type Registry = Subcommand.Registry;
}

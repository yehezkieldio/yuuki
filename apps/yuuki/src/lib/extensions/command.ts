import { Command, type CommandOptions } from "@sapphire/framework";

interface YuukiCommandOptions extends CommandOptions {
    tags: string[];
}

export abstract class YuukiCommand extends Command {
    public tags: string[];

    protected constructor(context: Command.LoaderContext, options: YuukiCommandOptions) {
        super(context, {
            ...options,
        });

        this.tags = options.tags;
    }
}

export declare namespace YuukiCommand {
    type Options = YuukiCommandOptions;
    type JSON = Command.JSON;
    type LoaderContext = Command.LoaderContext;
    type RunInTypes = Command.RunInTypes;
    type ChatInputCommandInteraction = Command.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Command.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Command.AutocompleteInteraction;
    type Registry = Command.Registry;
}

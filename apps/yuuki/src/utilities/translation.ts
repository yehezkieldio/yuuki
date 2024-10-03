import { Utility } from "@yuuki/plugin-custom-stores";

export class TranslationUtility extends Utility {
    constructor(context: Utility.LoaderContext, options: Utility.Options) {
        super(context, {
            ...options,
            name: "translation",
        });
    }

    /**
     * Get a raw TFunction for translation from a guild.
     * @param guildId The guild ID to get the language code from.
     * @returns The TFunction with the language code.
     */
    public async fromGuild(guildId: string) {
        const languageCode: string = await this.container.services.guild.getLanguageCode(guildId);
        const resolveKey = this.container.i18n.getT(languageCode);

        return resolveKey;
    }
}

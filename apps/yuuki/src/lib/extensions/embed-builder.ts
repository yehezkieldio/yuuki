import { type ColorResolvable, EmbedBuilder } from "discord.js";

export const Colors = {
    primary: "#c4a7e7" as ColorResolvable,
    secondary: "#9ccfd8" as ColorResolvable,
    success: "#f6c177" as ColorResolvable,
    error: "#eb6f92" as ColorResolvable,
    info: "#e0def4" as ColorResolvable,
    warning: "#ebbcba" as ColorResolvable,
};

export class YuukiEmbedBuilder extends EmbedBuilder {
    constructor() {
        super();
        this.setColor(Colors.primary);
    }

    /**
     * Set the color of the embed.
     * @see {@link Colors} for available colors.
     */
    public setTheme(color: keyof typeof Colors): this {
        this.setColor(Colors[color]);
        return this;
    }
}

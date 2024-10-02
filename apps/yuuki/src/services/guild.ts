import { Service } from "@yuuki/plugin-custom-stores";

export class GuildService extends Service {
    constructor(context: Service.LoaderContext, options: Service.Options) {
        super(context, {
            ...options,
            name: "guild",
        });
    }
}

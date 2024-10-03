import { Store } from "@sapphire/framework";

import { Utility } from "./utility";

export class UtilitiesStore extends Store<Utility, "utilities"> {
    constructor() {
        super(Utility, { name: "utilities" });
    }
}

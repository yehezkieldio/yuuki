import { describe, expect, test } from "bun:test";
import { getVersion } from "#src/package";

describe("YuukiUtils", () => {
    test("getVersion should returns a string", async () => {
        const version = await getVersion();
        expect(typeof version).toBe("string");
    });
});

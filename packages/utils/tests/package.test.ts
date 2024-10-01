import { describe, expect, test } from "bun:test";
import { getPackageJson } from "#src/package";

describe("YuukiUtils", () => {
    test("should return an object when package.json exists", async () => {
        const packageJson = await getPackageJson();
        expect(packageJson).toBeInstanceOf(Object);
    });
});

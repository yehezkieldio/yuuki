/// <reference types="bun" />
import { beforeEach, describe, expect, it } from "bun:test";

describe("YuukiEnvironment", () => {
    beforeEach(() => {
        process.env = {
            ...process.env,
            NODE_ENV: process.env.NODE_ENV ?? "test",
        };
    });

    it("should set NODE_ENV to 'test' if not defined", () => {
        require("../env");

        expect(process.env.NODE_ENV).toBe("test");
    });

    it("should retain NODE_ENV if already defined", () => {
        require("../env");

        process.env.NODE_ENV = "production";
        expect(process.env.NODE_ENV).toBe("production");
    });
});

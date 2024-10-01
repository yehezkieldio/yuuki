import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

export const getVersion = async (): Promise<string> => {
    const file: BunFile = Bun.file(Bun.pathToFileURL("package.json"));

    if (!(await file.exists())) {
        throw new Error("package.json not found or does not exist");
    }

    const contents: PackageJson = await file.json();

    if (!contents.version) {
        throw new Error("package.json does not have a version field");
    }

    return contents.version;
};

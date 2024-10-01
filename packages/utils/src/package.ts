import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

export const getPackageJson = async (): Promise<PackageJson> => {
    const file: BunFile = Bun.file(Bun.pathToFileURL("package.json"));

    if (!(await file.exists())) {
        throw new Error("package.json not found or does not exist");
    }

    return await file.json();
};

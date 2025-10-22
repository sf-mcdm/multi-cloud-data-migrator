import { Command } from "@oclif/core";
/**
 * Checks the GitHub repo's main branch package.json for a newer version.
 * If a new version is found, it blocks execution and tells the user to upgrade.
 * @param command The oclif command instance (`this`)
 */
export declare function checkVersionAndBlock(command: Command): Promise<void>;

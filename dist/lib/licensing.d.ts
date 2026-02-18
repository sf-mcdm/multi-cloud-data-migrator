import { Command } from "@oclif/core";
export declare const licenseFlags: {
    "request-license": import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    extend: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    licensestatus: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
};
/**
 * Checks the plugin's license.
 * @param cmd The command instance (for logging and error handling).
 * @param flags The parsed command flags.
 * @returns {Promise<boolean>} `false` if the command should exit, `true` if it should proceed.
 */
export declare function checkLicense(cmd: Command, flags: any): Promise<boolean>;

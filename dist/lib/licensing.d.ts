import { Command } from "@oclif/core";
export interface LicenseFeatures {
    isLegacy: boolean;
    isTrial: boolean;
    allowProd: boolean;
    allowFull: boolean;
    allowPartial: boolean;
    destructive: boolean;
    standardPlans: string[];
    deepCloneItems: string[];
    customPlanLimit: number;
}
export interface LicenseStatus {
    isValid: boolean;
    daysLeft: number;
    features: LicenseFeatures;
}
export declare const licenseFlags: {
    "request-license": import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    extend: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    licensestatus: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
};
export declare function checkLicense(cmd: Command, flags: any): Promise<LicenseStatus | false>;
/**
 * Non-exiting variant used exclusively by the UI Web socket to fetch live status
 */
export declare function getLicenseDetails(): LicenseStatus | null;

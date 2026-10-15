export interface SettingDefinition {
    description: string;
    defaultValue: any;
    isOverrideable: boolean;
}
export declare const SETTINGS_METADATA: Record<string, Record<string, SettingDefinition>>;

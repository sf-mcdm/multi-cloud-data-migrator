export interface CompositeKeyCfg {
    required: string[];
    optional?: string[];
}
export interface PolymorphicTargetCfg {
    sobject: string;
    externalIdField?: string;
    compositeKey?: CompositeKeyCfg | string[];
    lookups?: LookupCfg[];
}
export interface LookupCfg {
    field: string;
    sobject?: string;
    externalId?: string;
    targetField: string;
    targetSobjectCompositeKey?: CompositeKeyCfg | string[];
    polymorphicConfig?: Record<string, PolymorphicTargetCfg>;
}
export interface ObjectCfg {
    sobject: string;
    query: string;
    externalIdField?: string;
    compositeKey?: CompositeKeyCfg | string[];
    lookups: LookupCfg[];
    overrides?: Record<string, any>;
    useRestApi?: boolean;
    binaryFields?: string[];
    mode?: "insert-only";
    preQueries?: Array<{
        name: string;
        query: string;
    }>;
    fieldsToExclude?: string[];
}
export interface PcmConfigModule {
    default: ObjectCfg[];
    relatedProductQueries?: string[];
}

import { Connection } from "@salesforce/core";
export interface BulkV2Result {
    created: number;
    updated: number;
    failed: any[];
}
export declare function bulkApiV2Upsert(conn: Connection, sobject: string, toInsert: Record<string, any>[], toUpdate: Record<string, any>[], extIdField: string, log?: (msg: string) => void): Promise<BulkV2Result>;

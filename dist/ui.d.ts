import { Command } from "@oclif/core";
export default class Ui extends Command {
    static summary: string;
    run(): Promise<void>;
}

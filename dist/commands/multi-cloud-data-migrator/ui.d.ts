import { Command, Config } from "@oclif/core";
export default class Ui extends Command {
    static summary: string;
    constructor(argv: string[], config: Config);
    run(): Promise<void>;
}

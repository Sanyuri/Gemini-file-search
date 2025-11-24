import { BaseEntity } from "./BaseEntity";
import { v4 as uuidv4 } from "uuid";

export class Answer extends BaseEntity<string> {
    public readonly responseText: string;
    public readonly sources: string[];

    constructor(responseText: string, sources: string[]) {
        super(uuidv4(), new Date(), new Date(), false);
        this.responseText = responseText;
        this.sources = sources;
    }
}
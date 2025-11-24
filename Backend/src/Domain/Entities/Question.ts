import { BaseEntity } from "./BaseEntity";
import { v4 as uuidv4 } from "uuid";

export class Question extends BaseEntity<string> {
    public readonly text: string;

    constructor(text: string) {
        super(uuidv4(), new Date(), new Date(), false);
        this.text = text;
    }
}
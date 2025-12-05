import { ChatHistory } from "./ChatHistory";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { BaseEntity } from "./BaseEntity";

export class SessionChat extends BaseEntity<string> {
    sessionName: string;

    user?: User;

    questions?: ChatHistory[];

    constructor(sessionName: string, createdBy: string, user?: User) {
        super(uuidv4(), new Date(), createdBy, false);
        this.sessionName = sessionName;
        this.user = user;
    }
}
import { v4 as uuidv4 } from "uuid";
import { BaseEntity } from "./BaseEntity";
import { SessionChat } from "./SessionChat";

export class User extends BaseEntity<string> {
    username: string;

    email: string;

    password: string;

    isActive: boolean;

    sessionChats?: SessionChat[];

    constructor(username: string, email: string, password: string, createdBy: string) {
        super(uuidv4(), new Date(), createdBy, false);
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = false;
    }
}

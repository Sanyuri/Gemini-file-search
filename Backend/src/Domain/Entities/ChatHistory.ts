import { BaseEntity } from "./BaseEntity";
import { v4 as uuidv4 } from "uuid";
import { SessionChat } from "./SessionChat";

export class ChatHistory extends BaseEntity<string> {
    chatHistory: string;

    sources?: string[];

    sessionChat?: SessionChat;

    constructor(chatHistory: string, createdBy: string) {
        super(uuidv4(), new Date(), createdBy, false);
        this.chatHistory = chatHistory;
    }

}
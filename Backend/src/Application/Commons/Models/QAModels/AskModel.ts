export class AskModel {
    questionText: string;
    fileSearchStoreName: string;
    sessionChatId?: string;
    userId?: string;

    constructor(questionText: string, fileSearchStoreName: string, sessionChatId?: string, userId?: string) {
        this.questionText = questionText;
        this.fileSearchStoreName = fileSearchStoreName;
        this.sessionChatId = sessionChatId;
        this.userId = userId;
    }
}
export class AskModel {
    public questionText: string;
    public fileSearchStoreName: string;

    constructor(questionText: string, fileSearchStoreName: string) {
        this.questionText = questionText;
        this.fileSearchStoreName = fileSearchStoreName;
    }
}
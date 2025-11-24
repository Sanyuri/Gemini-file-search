export class AnswerModel {
    public responseText: string;
    public sources?: string[];

    constructor(responseText: string, sources?: string[]) {
        this.responseText = responseText;
        this.sources = sources;
    }
}
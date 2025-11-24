export class GeminiResponse {
    text: string;
    sourceUrls: string[];

    constructor(text: string, sourceUrls: string[]) {
        this.text = text;
        this.sourceUrls = sourceUrls;
    }
}
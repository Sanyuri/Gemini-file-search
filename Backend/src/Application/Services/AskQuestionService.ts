import { Answer } from "../../Domain/Entities/Answer";
import { Question } from "../../Domain/Entities/Question";
import { IGeminiRepository } from "../../Infrastructure/ExternalService/IGeminiService";
import { IAskQuestionService } from "../Commons/IServices/IAskQuestionService";

export class AskQuestionService implements IAskQuestionService {
    constructor(private readonly GeminiRepository: IGeminiRepository) {}

    async AskQuestion(questionText: string, fileSearchStoreName: string) {
        const question = new Question(questionText);

        const geminiResponse =  await this.GeminiRepository.queryFileSearch(question.text, fileSearchStoreName);

        const answer = new Answer(
            geminiResponse.text,
            geminiResponse.sourceUrls
        );

        return answer;
    }
}
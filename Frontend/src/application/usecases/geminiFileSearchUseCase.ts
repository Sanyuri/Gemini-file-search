import type { Answer } from "@/domain/entities/answer";
import type { Question } from "@/domain/entities/question";
import type { ApiRequest } from "@/domain/interfaces/apiRequest";
import type { ApiResponse } from "@/domain/interfaces/apiResponse";
import type { IGeminiFileSearchService } from "../services/iGeminiFileSearchService";

export class GeminiFileSearchUseCase {
    constructor(private geminiFileSearchService: IGeminiFileSearchService){}

    async askQuestion(questionPayload: ApiRequest<Question>) : Promise<ApiResponse<Answer>> {
        if(!questionPayload.data.questionText.trim() || !questionPayload.data.fileSearchStoreName.trim()) {
            return {
                status: 400,
                message: "Question text cannot be empty.",
                data: null,
                timestamp: new Date()
            };
        }

        const response = await this.geminiFileSearchService.askQuestion(questionPayload);

        return response;
    }
}
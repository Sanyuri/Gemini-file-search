import type { Answer } from "@/domain/entities/answer";
import type { Question } from "@/domain/entities/question";
import type { ApiRequest } from "@/domain/interfaces/apiRequest";
import type { ApiResponse } from "@/domain/interfaces/apiResponse";
import type { IGgeminiFileSearchRepository } from "@/domain/repositories/iGeminiFileSearchRepository";
import type { IGeminiFileSearchService } from "./iGeminiFileSearchService";

export class GeminiFileSearchService implements IGeminiFileSearchService {
    constructor(private geminiFileSearchRepository: IGgeminiFileSearchRepository) { }

    async askQuestion(payload: ApiRequest<Question>): Promise<ApiResponse<Answer>> {
        return await this.geminiFileSearchRepository.askQuestion(payload);
    }
}
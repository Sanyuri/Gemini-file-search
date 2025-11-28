import router from "@/app/router";
import type { Answer } from "@/domain/entities/answer";
import type { Question } from "@/domain/entities/question";
import type { ApiRequest } from "@/domain/interfaces/apiRequest";
import type { ApiResponse } from "@/domain/interfaces/apiResponse";
import type { IGgeminiFileSearchRepository } from "@/domain/repositories/iGeminiFileSearchRepository";

export class GeminiFileSearchRepository implements IGgeminiFileSearchRepository {
    async askQuestion(payload: ApiRequest<Question>): Promise<ApiResponse<Answer>> {
        const response = await router.post<ApiResponse<Answer>>('/ask', payload);
        
        return response.data;
    }
}
import type { Answer } from "@/domain/entities/answer";
import type { Question } from "@/domain/entities/question";
import type { ApiRequest } from "@/domain/interfaces/apiRequest";
import type { ApiResponse } from "@/domain/interfaces/apiResponse";

export interface IGeminiFileSearchService {
    askQuestion(question: ApiRequest<Question>): Promise<ApiResponse<Answer>>;
}
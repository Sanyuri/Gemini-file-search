import type { Answer } from "../entities/answer";
import type { Question } from "../entities/question";
import type { ApiRequest } from "../interfaces/apiRequest";
import type { ApiResponse } from "../interfaces/apiResponse";

export interface IGgeminiFileSearchRepository {
    askQuestion(payload: ApiRequest<Question>): Promise<ApiResponse<Answer>>;
}
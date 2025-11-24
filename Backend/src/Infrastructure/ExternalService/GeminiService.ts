import { IGeminiRepository } from "./IGeminiService";
import { GeminiResponse } from "../Models/GeminiResponse";
import { GoogleGenAI, GroundingChunk, Operations, Pager } from '@google/genai';

export class GeminiRepository implements IGeminiRepository {
    private ai: GoogleGenAI;

    constructor(apiKey: string) {
        this.ai = new GoogleGenAI({ apiKey: apiKey });
    }
    //#region Query Methods
    /**
     * Makes a query to the Gemini API using a specified file search store.
     * @param questionText - The question to be asked.
     * @param fileSearchStoreName - The name of the file search store to query.
     * @returns 
     */
    async queryFileSearch(questionText: string, fileSearchStoreName: string): Promise<GeminiResponse> {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: 'user', parts: [{ text: questionText }] }],
            config: {
                tools: [{
                    fileSearch: {
                        fileSearchStoreNames: [`fileSearchStores/${fileSearchStoreName}`],
                    },
                }],
            },
        });

        return {
            text: response.text ?? "No response text received.",
            sourceUrls: (() => {
            const chunks: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
            const titles = chunks.map(chunk => chunk.retrievedContext?.title ?? 'N/A');
            // preserve order while removing duplicates
            return Array.from(new Set(titles));
            })(),
        };
    }
    //#endregion

    //#region File Methods
    /**
     * Uploads a file to the Gemini API.
     * @param filePath - The path to the file to be uploaded.
     * @param mimeType - The MIME type of the file.
     * @param fileName - The name to assign to the uploaded file.
     * @returns An object containing the name of the uploaded file.
     */
    async uploadFile(filePath: string, mimeType: string, fileName: string): Promise<{ name: string; }> {
        const response = await this.ai.files.upload({
            file: `${filePath}`,
            config: {
                mimeType: mimeType,
            },
        });

        if (!response.name) {
            throw new Error("File upload failed: Gemini API did not return a file name.");
        }
        return { name: fileName };
    }

    /**
     * Deletes a file from a specified file search store in the Gemini API.
     * @param fileName - The name of the file to be deleted.
     * @param fileSearchStoreName - The name of the file search store from which to delete the file.
     */
    async deleteFile(fileName: string, fileSearchStoreName: string): Promise<void> {
        try {
            await this.ai.fileSearchStores.documents.delete({
                 name: `fileSearchStores/${fileSearchStoreName}/documents/${fileName}`,
                 config:{
                    force: true
                 }
                });
        } catch (error) {
            throw new Error(`Failed to delete file from Gemini API. Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    //#endregion

    //#region File Search Store Methods
    /**
     * Creates a new file search store in the Gemini API.
     * @param displayName - The display name for the new file search store.
     * @returns An object containing the name of the created file search store.
     */
    async createStore(displayName: string): Promise<{ name: string; }> {
        const fileSearchStore = await this.ai.fileSearchStores.create({
            config: { displayName: displayName }
        });
        if (!fileSearchStore.name) {
            throw new Error("File search store creation failed: Gemini API did not return a store name.");
        }
        return { name: fileSearchStore.name.split('/').pop() ?? '' };
    }

    /**
     * Adds a file to a specified file search store in the Gemini API.
     * @param fileName - The name of the file to be added.
     * @param fileSearchStoreName - The name of the file search store to which the file will be added.
     * @returns An object containing the name of the added file.
     */
    async addFileToStore(fileName: string, fileSearchStoreName: string): Promise<{ name: string; }> {
        if (!fileName) {
            throw new Error("No file names provided to add to store.");
        }

        let response = await this.ai.fileSearchStores.uploadToFileSearchStore({
            fileSearchStoreName: `fileSearchStores/${fileSearchStoreName}`,
            file: `uploads/${fileName}`,
            config: {
                displayName: fileName,
                chunkingConfig: {
                    whiteSpaceConfig: {
                        maxOverlapTokens: 20,
                        maxTokensPerChunk: 200,
                    }
                }
            }
        });

        if (!response.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            response = await this.ai.operations.get({ operation: response });
        }

        if (!response?.name) {
            throw new Error("Adding files to store failed: Gemini API did not return a store name.");
        }

        return { name: response.name.split('/').pop() ?? '' };
    }

    /**
     * Deletes a file search store from the Gemini API.
     * @param fileSearchStoreName - The name of the file search store to be deleted.
     */
    async deleteStore(fileSearchStoreName: string): Promise<void> {
        try {
            await this.ai.fileSearchStores.delete({ 
                name: `fileSearchStores/${fileSearchStoreName}`,
                config:{
                    force: true
                 }
            });
        } catch (error) {
            throw new Error(`Failed to delete file search store from Gemini API. Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    //#endregion
}
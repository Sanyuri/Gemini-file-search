import { Document } from "@google/genai";

export class FileMapper {
    static toDTO(file: Document) {
        return {
            id: file.name,
            displayName: file.displayName,
            sizeBytes: file.sizeBytes,
            mimeType: file.mimeType,
            createTime: file.createTime!,
            updateTime: file.updateTime!,
            state: file.state,
        };
    }
}
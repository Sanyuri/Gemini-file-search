export interface File {
    id?: string;
    displayName?: string;
    sizeBytes?: string;
    mimeType?: string;
    createTime: string;
    updateTime: string;
    state?: string;
}
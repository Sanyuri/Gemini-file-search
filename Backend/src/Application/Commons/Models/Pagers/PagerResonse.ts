export interface PagerResonse<T> {
    items: T[];
    pagination: {
        pageSize?: number;
        nextPageToken?: string;
    };
}
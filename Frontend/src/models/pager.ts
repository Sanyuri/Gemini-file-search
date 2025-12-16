export interface Pager<T> {
    items: T[];
    pagination: {
        pageSize?: number;
        nextPageToken?: string;
    };
}
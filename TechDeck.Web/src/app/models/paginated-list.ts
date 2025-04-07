export interface IPaginatedList<T> {
    items: T[];
    pageNumber: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export class PaginatedList<T> implements IPaginatedList<T> {
    items: T[] = [];
    pageNumber: number = 0;
    totalPages: number = 0;
    hasPreviousPage: boolean = false;
    hasNextPage: boolean = false;

    public static default<T>(): PaginatedList<T> {
        return new PaginatedList<T>();
    }
}
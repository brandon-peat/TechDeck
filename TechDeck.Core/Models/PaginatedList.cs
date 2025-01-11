﻿public record PaginatedList<T>(
    List<T> Items,
    int PageNumber,
    int TotalPages)
{
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;
}
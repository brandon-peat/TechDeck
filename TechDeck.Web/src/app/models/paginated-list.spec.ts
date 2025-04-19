
import { PaginatedList } from './paginated-list';

describe('PaginatedList', () => {
  it('should create an instance with default values', () => {
    const list = new PaginatedList<string>();
    expect(list).toBeTruthy();
    expect(list.items).toEqual([]);
    expect(list.pageNumber).toBe(0);
    expect(list.totalPages).toBe(0);
    expect(list.hasPreviousPage).toBe(false);
    expect(list.hasNextPage).toBe(false);
  });

  it('default() should return an instance with default values', () => {
    const list = PaginatedList.default<number>();
    expect(list).toBeTruthy();
    expect(list.items).toEqual([]);
    expect(list.pageNumber).toBe(0);
    expect(list.totalPages).toBe(0);
    expect(list.hasPreviousPage).toBe(false);
    expect(list.hasNextPage).toBe(false);
  });
});

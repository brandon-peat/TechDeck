export interface Result<T> {
  value: T | null;
  isSuccess: boolean;
  errorMessage: string | null;
}
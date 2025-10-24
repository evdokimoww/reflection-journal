export interface IFilterItem {
  label: string;
  value: string;
}

export type ResponseType<T> =
  | {
      data: T;
      error: null;
    }
  | { data: null; error: Error };

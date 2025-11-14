export type ResponseError = Error | null;

export interface FilterValuesResponse {
  methodologies: {
    data:
      | {
          id: string;
          title: string;
        }[]
      | null;
    error: ResponseError;
  };
  tags: {
    data:
      | {
          id: string;
          value: string;
        }[]
      | null;
    error: ResponseError;
  };
}

export type ResponseType<T> =
  | {
      data: T;
      error: null;
    }
  | { data: null; error: Error };

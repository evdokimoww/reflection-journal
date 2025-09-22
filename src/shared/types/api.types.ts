export type getFilterValuesResponseType = {
  methodologies: {
    data:
      | {
          id: string;
          title: string;
        }[]
      | null;
    error: Error | null;
  };
  tags: {
    data:
      | {
          id: string;
          value: string;
        }[]
      | null;
    error: Error | null;
  };
};

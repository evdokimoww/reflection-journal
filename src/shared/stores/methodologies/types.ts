import type { Methodology } from "@/shared/types";

export interface MethodologiesState {
  methodologies: Methodology[];
  isLoading: boolean;
  error: ResponseError;
}

export interface MethodologiesActions {
  fetchMethodologies: () => Promise<void>;
}

export interface MethodologiesStore extends MethodologiesState {
  actions: MethodologiesActions;
}

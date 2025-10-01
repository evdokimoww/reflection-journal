export interface IMethodology {
  id: string;
  title: string;
  short_description?: string;
  description?: string;
  theory?: string;
  steps: IStep[]; // массив шагов/вопросов
}

export interface IStep {
  id: string;
  question: string;
  description?: string;
  hint?: string;
}

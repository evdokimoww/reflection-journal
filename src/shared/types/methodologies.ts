export interface Methodology {
  id: string;
  title: string;
  short_description?: string;
  description?: string;
  theory?: string;
  steps: Step[]; // массив шагов/вопросов
}

export interface Step {
  id: string;
  question: string;
  description?: string;
  hint?: string;
}

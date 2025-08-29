type Step = {
  value: string;
};

export interface IReflectionEntry {
  id: string;
  userId: string;
  createdAt: Date;
  methodId: string;
  title: string; // заголовок, или главный вопрос
  steps: Step[]; // шаг — ответ
  tags: string[];
}

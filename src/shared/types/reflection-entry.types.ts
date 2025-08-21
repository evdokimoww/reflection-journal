export interface IReflectionEntry {
  id: string;
  userId: string;
  createdAt: Date;
  methodId: string;
  title: string; // заголовок, или главный вопрос
  answers: { [stepId: string]: string }; // шаг — ответ
  tags: string[];
}

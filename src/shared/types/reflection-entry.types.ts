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

interface EntryResponseTag {
  tag: {
    value: string;
  };
}

interface IEntryResponseItem {
  id: string;
  created_at: string;
  title: string;
  methodology: { title: string };
  tags: EntryResponseTag[];
}

export type EntryResponseArray = IEntryResponseItem[];

export interface IEntry {
  id: string;
  created_at: string;
  title: string;
  methodology: string;
  tags: string[];
}

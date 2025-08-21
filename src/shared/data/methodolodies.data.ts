export interface IMethodology {
  id: string;
  title: string;
  description?: string;
  steps: Step[]; // массив шагов/вопросов
}

interface Step {
  id: string;
  question: string;
  hint?: string;
}

export const METHODOLOGIES: IMethodology[] = [
  {
    id: "5why",
    title: "5 Why",
    description: "Описание для методологии 5 Why",
    steps: [
      {
        id: "step1",
        question: "Вопрос 1",
        hint: "Подсказка 1",
      },
      {
        id: "step2",
        question: "Вопрос 2",
        hint: "Подсказка 2",
      },
      {
        id: "step3",
        question: "Вопрос 3",
        hint: "Подсказка 3",
      },
      {
        id: "step4",
        question: "Вопрос 4",
        hint: "Подсказка 4",
      },
      {
        id: "step5",
        question: "Вопрос 5",
        hint: "Подсказка 5",
      },
    ],
  },
  {
    id: "grow",
    title: "GROW",
    description: "Описание для методологии GROW",
    steps: [
      {
        id: "step1",
        question: "G",
        hint: "Подсказка 1",
      },
      {
        id: "step2",
        question: "R",
        hint: "Подсказка 2",
      },
      {
        id: "step3",
        question: "O",
        hint: "Подсказка 3",
      },
      {
        id: "step4",
        question: "W",
        hint: "Подсказка 4",
      },
    ],
  },
  {
    id: "free",
    title: "Свободный текст",
    description: "",
    steps: [
      {
        id: "step1",
        question: "Свободный текст",
      },
    ],
  },
];

export const METHODOLOGIES_NAMES = METHODOLOGIES.reduce(
  (acc, m) => ({ ...acc, [m.id]: m.title }),
  {},
);

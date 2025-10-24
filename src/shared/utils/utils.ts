import { toaster } from "@/components/ui/toaster";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const createToastError = (error: string | Error) => {
  let errorMessage = "Неизвестная ошибка";

  if (error instanceof Error) {
    if (isRedirectError(error)) return;
    errorMessage = error.message;
  } else {
    errorMessage = error;
  }

  setTimeout(() => {
    toaster.create({
      title: errorMessage,
      type: "error",
    });
  }, 0);
};

// Сортировка массива объектов по JSON-строке для стабильного сравнения
function sortArray(arr: any[]): any[] {
  return arr
    .map((item) => (typeof item === "object" ? JSON.stringify(item) : item))
    .sort()
    .map((str) => {
      try {
        return JSON.parse(str);
      } catch {
        return str;
      }
    });
}

// Глубокое сравнение двух значений, игнорируя порядок в массивах
// TODO any
export function deepEqualFormValues(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    const sortedA = sortArray(a);
    const sortedB = sortArray(b);
    return sortedA.every((item, idx) =>
      deepEqualFormValues(item, sortedB[idx]),
    );
  }

  if (typeof a === "object" && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEqualFormValues(a[key], b[key]));
  }

  return false;
}

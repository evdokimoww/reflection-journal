import { toaster } from "@/components/ui/toaster";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const createToastError = (error: string | Error) => {
  let errorMessage = "";

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

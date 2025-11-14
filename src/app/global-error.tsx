"use client";

import React, { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div>
          <h1>Что-то пошло не так в приложении</h1>
          <h2>{error.message}</h2>
          <button onClick={() => reset()}>Попробовать снова</button>
        </div>
      </body>
    </html>
  );
}

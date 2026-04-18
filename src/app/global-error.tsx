'use client'

import NextError from 'next/error'
import React from 'react'
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

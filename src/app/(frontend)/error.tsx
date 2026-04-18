'use client'
import { Gutter } from '@components/Gutter/index'
import NextError from 'next/error'
import React from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Gutter>
      <h2>Something went wrong</h2>
      <NextError statusCode={500} />
    </Gutter>
  )
}

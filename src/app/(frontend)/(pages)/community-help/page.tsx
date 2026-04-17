import type { Metadata } from 'next'

import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import React from 'react'

import { CommunityHelp } from './client_page'

interface CommunityHelpPost {
  id: string
  title: string
  slug: string
  communityHelpType: 'github'
  author?: string
  createdAt: string
  upvotes: number
  messageCount: number
}

const Page = async () => {
  const communityHelpPosts: CommunityHelpPost[] = []

  return <CommunityHelp initialPosts={communityHelpPosts} />
}

export default Page

export const metadata: Metadata = {
  description:
    'Find what you need faster. The Payload Community Help archive is a great place to start.',
  openGraph: mergeOpenGraph({
    description:
      'Find what you need faster. The Payload Community Help archive is a great place to start.',
    title: 'Community Help | Payload',
    url: '/community-help',
  }),
  title: {
    absolute: 'Community Help | Payload',
    template: '%s | Community Help | Payload',
  },
}

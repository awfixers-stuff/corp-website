'use client'

import { BackgroundGrid } from '@components/BackgroundGrid/index'
import { Gutter } from '@components/Gutter/index'
import { Heading } from '@components/Heading/index'
import { CommentsIcon } from '@root/graphics/CommentsIcon/index'
import { GithubIcon } from '@root/graphics/GithubIcon/index'
import { ArrowIcon } from '@root/icons/ArrowIcon/index'
import getRelativeDate from '@root/utilities/get-relative-date'
import Link from 'next/link'
import React, { useState } from 'react'

import { ArchiveSearchBar } from './ArchiveSearchBar/index'
import classes from './index.module.scss'

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

export const CommunityHelp: React.FC<{ initialPosts: CommunityHelpPost[] }> = ({
  initialPosts,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [posts] = useState(initialPosts)

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className={classes.communityHelpWrap}>
      <BackgroundGrid className={classes.bg} />
      <Gutter>
        <div className={['grid', classes.grid].join(' ')}>
          <div className="start-1 cols-12">
            <Heading className={classes.heading} element="h1">
              Community Help
            </Heading>
            <div className={classes.searchBarWrap}>
              <ArchiveSearchBar
                className={classes.searchBar}
                onChange={setSearchQuery}
                value={searchQuery}
              />
            </div>
            {filteredPosts.length > 0 && (
              <ul className={classes.postsWrap}>
                {filteredPosts.map((post) => (
                  <li className={classes.post} key={post.id}>
                    <Link
                      className={classes.postContent}
                      href={`/community-help/${post.communityHelpType}/${post.slug}`}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      <div>
                        <h5 className={classes.title}>{post.title}</h5>
                        <div className={classes.titleMeta}>
                          <span className={classes.platform}>
                            <GithubIcon className={classes.icon} />
                          </span>
                          {post.author && <span className={classes.author}>{post.author}</span>}
                          <span>—</span>
                          <span className={classes.date}>
                            &nbsp;{getRelativeDate(new Date(post.createdAt))}
                          </span>
                        </div>
                      </div>
                      <div className={classes.upvotes}>
                        {post.upvotes > 0 && (
                          <span>
                            <ArrowIcon rotation={-45} /> {post.upvotes || ''}
                          </span>
                        )}
                        {post.messageCount > 0 && (
                          <span>
                            <CommentsIcon /> {post.messageCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {filteredPosts.length === 0 && searchQuery && (
              <div>
                <h5>Sorry, no results were found...</h5>
                <span>Search tips</span>
                <ul>
                  <li>Make sure all words are spelled correctly</li>
                  <li>Try more general keywords</li>
                  <li>Try different keywords</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export { CommunityHelp as CommunityHelpPage }

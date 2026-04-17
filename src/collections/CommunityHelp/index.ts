import type { RichTextField } from 'payload'

import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'

function extractTextFromContent(content: unknown[]): string {
  if (!Array.isArray(content)) return ''
  return content
    .map((block) => {
      if (typeof block === 'object' && block !== null && 'text' in block) {
        return (block as { text: string }).text
      }
      if (typeof block === 'object' && block !== null && 'children' in block) {
        return extractTextFromContent((block as { children: unknown[] }).children)
      }
      return ''
    })
    .join(' ')
}

export const CommunityHelp: CollectionConfig = {
  slug: 'community-help',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'communityHelpType',
      type: 'radio',
      access: {
        update: () => false,
      },
      label: 'Community Help Type',
      options: [
        {
          label: 'GitHub Discussion',
          value: 'github',
        },
      ],
    },
    {
      name: 'githubID',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.communityHelpType === 'github',
      },
      index: true,
      label: 'GitHub ID',
    },

    {
      name: 'communityHelpJSON',
      type: 'json',
      required: true,
    },
    {
      name: 'introDescription',
      type: 'text',
      hidden: true,
      hooks: {
        afterRead: [
          ({ data }) => {
            return extractTextFromContent(data?.communityHelpJSON.body)
          },
        ],
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.introDescription
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      index: true,
      label: 'Slug',
    },
    {
      name: 'helpful',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedDocs',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      index: true,
      relationTo: 'docs',
    },
    {
      name: 'threadCreatedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  labels: {
    plural: 'Community Helps',
    singular: 'Community Help',
  },
}

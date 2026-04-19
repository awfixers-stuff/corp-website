import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isAdmin,
    delete: isAdminOrSelf,
    read: () => true,
    update: isAdminOrSelf,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Override default email field to restrict public read access
    {
      name: 'email',
      type: 'email',
      access: {
        read: isAdminOrSelfFieldLevel,
      },
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'twitter',
      type: 'text',
      admin: {
        description: 'Example: `payloadcms`',
      },
      label: 'Twitter Handle',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: isAdminFieldLevel,
        read: isAdminOrSelfFieldLevel,
        update: isAdminFieldLevel,
      },
      defaultValue: ['public'],
      hasMany: true,
      options: ['admin', 'public'],
      required: true,
    },
    {
      name: 'clerkUserId',
      type: 'text',
      unique: true,
    },
  ],
}

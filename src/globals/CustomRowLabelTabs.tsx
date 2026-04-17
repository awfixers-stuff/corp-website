'use client'
import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'

import { useRowLabel } from '@awfixers-stuff/ui'
import React from 'react'

const CustomRowLabelTabs: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data } = useRowLabel<any>()

  return data.label || '...'
}

export default CustomRowLabelTabs

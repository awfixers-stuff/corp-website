'use client'

import RedeployButton from '@components/RedeployButton'
import RefreshMdxToLexicalButton from '@components/RefreshMdxToLexicalButton'
import React from 'react'

import './index.scss'

const baseClass = 'after-nav-actions'

const AfterNavActions: React.FC = () => {
  return (
    <div className={baseClass}>
      <span className={`${baseClass}__group-title`}>Admin Actions</span>
      <RefreshMdxToLexicalButton />
      <RedeployButton />
    </div>
  )
}

export default AfterNavActions

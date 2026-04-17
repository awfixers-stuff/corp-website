import { SearchIconV2 } from '@root/graphics/SearchIconV2/index'
import { CrosshairIcon } from '@root/icons/CrosshairIcon/index'
import React from 'react'

import classes from './index.module.scss'

export const ArchiveSearchBar: React.FC<{
  className: string
  value: string
  onChange: (value: string) => void
}> = ({ className, value, onChange }) => {
  return (
    <div className={[classes.filterBar, className].filter(Boolean).join(' ')}>
      <input
        className={classes.searchInput}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community help..."
        type="text"
        value={value}
      />
      <div className={classes.searchIcon}>
        <SearchIconV2 />
      </div>
    </div>
  )
}

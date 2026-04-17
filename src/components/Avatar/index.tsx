import { useAuth } from '@root/providers/Auth/index'
import * as React from 'react'

// import { DropdownMenu } from './DropdownMenu'
import classes from './index.module.scss'

export const Avatar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth()

  return (
    <div className={[classes.avatar, className].filter(Boolean).join(' ')}>
      <div className={classes.primaryUser}>
        <div className={classes.userInitial}>{user?.email?.charAt(0).toUpperCase()}</div>
      </div>
    </div>
  )
}

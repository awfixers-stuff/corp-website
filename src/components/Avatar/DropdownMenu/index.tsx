import { useAuth } from '@root/providers/Auth/index'
import useClickAway from '@root/utilities/use-click-away'
import * as React from 'react'

import classes from './index.module.scss'

export const DropdownMenu: React.FC<{
  isOpen: boolean
  onChange: (isOpen: boolean) => void
}> = ({ isOpen: isOpenFromProps, onChange }) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = React.useState(isOpenFromProps)

  React.useEffect(() => {
    setIsOpen(isOpenFromProps)
  }, [isOpenFromProps])

  React.useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(isOpen)
    }
  }, [isOpen, onChange])

  const ref = React.useRef<HTMLDivElement>(null)

  const handleClickAway = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  useClickAway(ref, handleClickAway)

  if (isOpen) {
    return (
      <div className={classes.dropdown} ref={ref}>
        <div>
          <p className={classes.dropdownLabel}>Account</p>
          <div className={classes.profileLink}>
            <div className={classes.profileAvatar}>
              <div className={classes.userInitial}>{user?.email?.charAt(0).toUpperCase()}</div>
            </div>
            <p className={classes.profileName}>{user?.email}</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

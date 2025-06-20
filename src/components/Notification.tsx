import { useEffect, useRef } from 'react'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeNotification, selectNotifications } from '../features/notifications.slice'

const Notification = () => {
  const notifications = useAppSelector(selectNotifications)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const displayed = useRef<Set<string | number>>(new Set())

  useEffect(() => {
    notifications.forEach(({ key, text, type }) => {
      if (displayed.current.has(key)) return

      enqueueSnackbar(text, {
        variant: type,
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        autoHideDuration: 3000,
      })

      dispatch(removeNotification(key))
      displayed.current.add(key)
    })
  }, [notifications, enqueueSnackbar, dispatch])

  return null
}

export default Notification

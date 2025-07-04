import { useEffect } from 'react'
import { OfferManagementProps } from './types/common'
import { setAuthData } from './features/auth.slice'
import { changeLanguageManually } from './utils/i18n'
import { Language } from './types/auth'
import { Provider } from 'react-redux'
import { store } from './app/store'
import omTheme from './theme/omTheme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import Notification from './components/Notification'
import Confirm from './components/Confirm'
import MainPage from './pages/MainPage'

const OfferManagementApp: React.FC<OfferManagementProps> = (props) => {
  useEffect(() => {
    store.dispatch(
      setAuthData({
        username: props.username,
        type: props.type,
        language: props.language || Language.SR,
      }),
    )
    changeLanguageManually(props.language || Language.SR)
  }, [props.username, props.type, props.language])

  return (
    <Provider store={store}>
      <ThemeProvider theme={omTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
          <Notification />
        </SnackbarProvider>
        <Confirm />
        <MainPage crmOfferId={props.crmOfferId} />
      </ThemeProvider>
    </Provider>
  )
}

export default OfferManagementApp

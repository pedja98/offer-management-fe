import React from 'react'
import ReactDOM from 'react-dom/client'
import OfferManagementApp from './OfferManagementApp'
import { Language, UserType } from './types/auth'
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <OfferManagementApp crmOfferId={57} language={Language.SR} username={'pmoe123'} type={UserType.ADMIN} />
    </Provider>
  </React.StrictMode>,
)

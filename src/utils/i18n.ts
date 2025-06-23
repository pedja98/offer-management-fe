import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { store } from '../app/store'
import { Language } from '../types/auth'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: store.getState().auth.language.toLowerCase() || Language.SR.toLowerCase(),
    fallbackLng: Language.SR.toLowerCase(),
    debug: false,
    backend: {
      loadPath: `${process.env.REACT_APP_OM_FE}/locales/{{lng}}/{{ns}}.json`,
    },
    ns: ['general', 'company', 'offer', 'tariffPlan'],
    defaultNS: 'general',
    interpolation: {
      escapeValue: false,
    },
  })

export const changeLanguageManually = (lang: Language) => {
  i18n.changeLanguage(lang.toLowerCase())
}

export default i18n

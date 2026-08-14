/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { internationalization } from '../config/i18n.js'
import es from '../locales/es.js'
import en from '../locales/en.js'
import { isSupportedLanguage, resolveLanguagePreference } from '../utils/language.js'

const dictionaries = { es, en }
const I18nContext = createContext(null)

function initialSelection() {
  const requested = new URLSearchParams(window.location.search).get('lang')
  const saved = localStorage.getItem(internationalization.storageKey)
  const selected = resolveLanguagePreference({ requested, saved, languages: navigator.languages?.length ? navigator.languages : [navigator.language] })
  if (isSupportedLanguage(requested)) localStorage.setItem(internationalization.storageKey, selected)
  return selected
}

export function I18nProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialSelection)
  const language = selectedLanguage === 'en' ? 'en' : 'es'
  const copy = dictionaries[language]

  const selectLanguage = (nextLanguage, { manual = true } = {}) => {
    if (!isSupportedLanguage(nextLanguage)) return
    if (manual) localStorage.setItem(internationalization.storageKey, nextLanguage)
    const url = new URL(window.location.href)
    if (internationalization.supportedLocales.includes(nextLanguage)) url.searchParams.set('lang', nextLanguage)
    else url.searchParams.delete('lang')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setSelectedLanguage(nextLanguage)
  }

  useEffect(() => {
    document.documentElement.lang = selectedLanguage
    document.title = copy.seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.seo.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.seo.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.seo.ogDescription)
  }, [selectedLanguage, copy])

  const value = useMemo(() => ({ language, selectedLanguage, selectLanguage, copy }), [language, selectedLanguage, copy])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}

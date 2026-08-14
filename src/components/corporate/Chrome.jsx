import { useState } from 'react'
import { company } from '../../data/corporate.js'
import { useI18n } from '../../context/I18nContext.jsx'
import { whatsappUrl } from '../../utils/contact.js'
import { Icon } from './Icons.jsx'
import { GoogleTranslate, clearGoogleTranslation } from './GoogleTranslate.jsx'

export function LanguageSwitch() {
  const { selectedLanguage, selectLanguage, copy } = useI18n()
  const selectOfficialLanguage = (nextLanguage) => {
    const wasTranslated = clearGoogleTranslation()
    selectLanguage(nextLanguage)
    if (wasTranslated) window.setTimeout(() => window.location.reload(), 80)
  }
  return <div className="language-switch notranslate" translate="no" role="group" aria-label={copy.language.label}><button type="button" aria-pressed={selectedLanguage === 'es'} aria-label={copy.language.es} onClick={() => selectOfficialLanguage('es')}>ES</button><span aria-hidden="true">|</span><button type="button" aria-pressed={selectedLanguage === 'en'} aria-label={copy.language.en} onClick={() => selectOfficialLanguage('en')}>EN</button></div>
}

export function Logo({ light = false }) {
  const { copy } = useI18n()
  return <a className={`corp-logo ${light ? 'is-light' : ''}`} href="#inicio" aria-label={copy.footer.logoLabel}><span className="logo-mark"><i>JC</i></span><span><b>JC CABARCAS</b><small>INGENIERÍA SAS</small></span></a>
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { copy } = useI18n()
  return <header className="corp-header"><div className="nav-shell"><Logo light/><button className="corp-menu" type="button" aria-label={open ? copy.nav.close : copy.nav.open} aria-controls="corporate-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button><nav id="corporate-navigation" className={open ? 'corp-nav is-open' : 'corp-nav'} aria-label={copy.nav.label}><a href="#inicio" onClick={() => setOpen(false)}>{copy.nav.home}</a>{copy.nav.items.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}<div className="language-controls"><LanguageSwitch/><GoogleTranslate/></div><a className="nav-cta" href="#cotizar" onClick={() => setOpen(false)}>{copy.nav.cta} <Icon name="arrow" size={17}/></a></nav></div></header>
}

export function Footer() {
  const { copy } = useI18n()
  return <footer className="corp-footer"><div className="footer-grid"><div><Logo light/><p>{copy.footer.description}</p></div><div><b>{copy.footer.explore}</b>{copy.nav.items.slice(0, 5).map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div><b>{copy.footer.contact}</b><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:+${company.phone}`}>{company.displayPhone}</a><a href={`tel:+${company.secondaryPhone}`}>{company.secondaryDisplayPhone}</a><span>{company.location}</span></div></div><div className="footer-bottom"><small>© {new Date().getFullYear()} {company.name}. {copy.footer.rights}</small><span>{copy.footer.claim}</span></div></footer>
}

export function WhatsApp() {
  const { copy } = useI18n()
  return <a className="corp-whatsapp" href={whatsappUrl(company, copy.footer.whatsappMessage)} target="_blank" rel="noreferrer" aria-label={copy.footer.whatsappLabel}><span>WA</span><b>{copy.footer.whatsapp}</b></a>
}

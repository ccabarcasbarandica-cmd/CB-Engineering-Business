import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { whatsappUrl } from '../utils/contact.js'

export function Header({ site }) {
  const [open, setOpen] = useState(false)
  return <header className="header-wrap"><div className="header">
    <a className="brand" href="#top" aria-label={`${site.name}, inicio`}><span>{site.name.charAt(0)}</span>{site.name}</a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}><span/><span/></button>
    <nav className={open ? 'nav is-open' : 'nav'} aria-label="Navegación principal">
      {site.nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="button button-small" href={whatsappUrl(site)} target="_blank" rel="noreferrer">{site.primaryCta}</a>
    </nav>
  </div></header>
}

export function Hero({ site, children }) {
  return <section className="hero" id="top">
    <div className="hero-copy reveal">
      <p className="eyebrow"><span />{site.eyebrow}</p>
      <h1>{site.tagline}</h1>
      <p className="lead">{site.description}</p>
      <div className="hero-actions">
        <a className="button button-primary" href={whatsappUrl(site)} target="_blank" rel="noreferrer">{site.primaryCta} <span aria-hidden="true">↗</span></a>
        <a className="text-link" href="#services">Conocer más <span>↓</span></a>
      </div>
      {children}
    </div>
    <div className="hero-visual"><img src={site.heroImage} alt={`Ambiente de demostración para ${site.name}`} /><div className="image-note"><span>●</span>{site.heroNote}</div></div>
  </section>
}

export function SectionTitle({ eyebrow, title, intro }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
}

export function WhatsAppButton({ site }) {
  return <a className="whatsapp" href={whatsappUrl(site)} target="_blank" rel="noreferrer" aria-label={`Contactar a ${site.name} por WhatsApp`}><span className="whatsapp-icon" aria-hidden="true">↗</span><span><small>¿Te ayudamos?</small><b>Escríbenos</b></span></a>
}

export function DemoBadge({ site }) {
  if (!site.isDemo) return null
  return <div className="demo-badge" role="note"><span>CB</span>{site.demoLabel}</div>
}

export function Location({ site }) {
  return <section className="section location" id="location">
    <div><SectionTitle eyebrow="Encuéntranos" title="Estamos cerca de ti" /><p className="location-address">{site.address}</p><a className="text-link" href={site.mapUrl} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div>
    <a className="map-card" href={site.mapUrl} target="_blank" rel="noreferrer" aria-label="Ver ubicación en Google Maps"><div className="map-lines"/><span className="pin">●</span><strong>{site.name}</strong><small>Cómo llegar ↗</small></a>
  </section>
}

export function Hours({ hours }) {
  return <div className="hours"><p className="eyebrow">Horarios</p>{hours.map(([day, time]) => <div key={day}><span>{day}</span><strong>{time}</strong></div>)}</div>
}

export function Gallery({ images, title = 'Una mirada a nuestra experiencia' }) {
  return <section className="section gallery-section" id="gallery"><SectionTitle eyebrow="Galería" title={title} /><div className="gallery">{images.slice(1).map((src, index) => <figure key={src}><img src={src} alt={`Imagen demostrativa de galería ${index + 1}`} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></figure>)}</div></section>
}

export function QRCard({ site }) {
  const [src, setSrc] = useState('')
  useEffect(() => { QRCode.toDataURL(whatsappUrl(site), { width: 220, margin: 1, color: { dark: site.theme.dark, light: '#ffffff' } }).then(setSrc) }, [site])
  return <div className="qr-card"><div className="qr-frame">{src && <img src={src} alt="Código QR para abrir WhatsApp" />}<span>Apunta tu cámara</span></div><div><p className="eyebrow">Reserva fácil</p><h3>De la mesa a WhatsApp en segundos</h3><p>Escanea el código para consultar disponibilidad o reservar.</p><a href={whatsappUrl(site)} target="_blank" rel="noreferrer">Abrir WhatsApp ↗</a></div></div>
}

export function CTA({ site, title = '¿Listo para visitarnos?' }) {
  return <section className="cta"><p className="eyebrow">Hablemos</p><h2>{title}</h2><p>Escríbenos y recibe atención personalizada.</p><a className="button button-light" href={whatsappUrl(site)} target="_blank" rel="noreferrer">{site.primaryCta} ↗</a></section>
}

export function Footer({ site }) {
  return <footer className="footer"><div className="footer-intro"><a className="brand" href="#top"><span>{site.name.charAt(0)}</span>{site.name}</a><p>{site.description}</p><a className="footer-cta" href={whatsappUrl(site)} target="_blank" rel="noreferrer">{site.primaryCta} ↗</a></div><div><b>Contacto</b><a href={`tel:+${site.phone}`}>{site.displayPhone}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.mapUrl} target="_blank" rel="noreferrer">{site.address}</a></div><div><b>Explora</b>{site.nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><b>Síguenos</b><a href={site.social.instagram}>Instagram ↗</a><a href={site.social.facebook}>Facebook ↗</a></div><small>© {new Date().getFullYear()} {site.name}. Contenido de demostración.</small></footer>
}

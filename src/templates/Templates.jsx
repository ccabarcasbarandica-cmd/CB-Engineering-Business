import { CTA, DemoBadge, Footer, Gallery, Header, Hero, Hours, Location, QRCard, WhatsAppButton } from '../components/SiteChrome.jsx'
import { FAQ, ProductCard, Services, Team, Testimonials } from '../components/Content.jsx'
import { SectionTitle } from '../components/SiteChrome.jsx'
import { whatsappUrl } from '../utils/contact.js'

function Shell({ site, children }) {
  const theme = { '--accent': site.theme.accent, '--accent-soft': site.theme.accentSoft, '--ink': site.theme.dark, '--surface': site.theme.surface }
  return <div className={`site site-${site.type}`} style={theme}><Header site={site}/><main>{children}</main><DemoBadge site={site}/><WhatsAppButton site={site}/><Footer site={site}/></div>
}

export function RestaurantTemplate({ site }) {
  return <Shell site={site}>
    <Hero site={site}><div className="hero-highlights">{site.highlights.map(item => <span key={item}>{item}</span>)}</div></Hero>
    <section className="section menu" id="menu"><SectionTitle eyebrow="Nuestra carta" title="Platos con historia y territorio" intro="Una selección breve, fresca y hecha al momento."/><div className="category-list">{site.categories.map((category, index) => <span className={index === 0 ? 'active' : ''} key={category}>{category}</span>)}</div><div className="product-list">{site.services.map(item => <ProductCard key={item.name} item={item}/>)}</div></section>
    <Gallery images={site.gallery}/>
    <section className="section split-contact reservation-panel"><QRCard site={site}/><Hours hours={site.hours}/></section>
    <Location site={site}/><CTA site={site} title="Tu mesa te está esperando"/>
  </Shell>
}

export function ClinicTemplate({ site }) {
  return <Shell site={site}>
    <Hero site={site}><div className="trust-row">{site.highlights.map(item => <span key={item}>✓ {item}</span>)}</div></Hero>
    <Services items={site.services} title="Cuidado integral para tu sonrisa" eyebrow="Tratamientos"/>
    <Team people={site.team}/><Testimonials items={site.testimonials}/>
    <section className="section split-contact appointment-panel"><div><SectionTitle eyebrow="Agenda tu cita" title="El primer paso es conversar"/><p>Cuéntanos qué necesitas. Nuestro equipo confirmará la disponibilidad y te orientará.</p><a className="button" href={whatsappUrl(site)} target="_blank" rel="noreferrer">Solicitar cita ↗</a><small>Respuesta directamente por WhatsApp durante el horario de atención.</small></div><Hours hours={site.hours}/></section>
    <Location site={site}/><FAQ items={site.faqs}/><CTA site={site} title="Una sonrisa sana empieza aquí"/>
  </Shell>
}

export function BarberTemplate({ site }) {
  return <Shell site={site}>
    <Hero site={site}><div className="hero-highlights">{site.highlights.map(item => <span key={item}>{item}</span>)}</div></Hero>
    <Services items={site.services} title="Elige tu ritual" eyebrow="Servicios & precios"/>
    <Gallery images={site.gallery} title="Precisión en cada detalle"/><Team people={site.team}/>
    <section className="section split-contact appointment-panel"><div><SectionTitle eyebrow="Reserva" title="Tu próximo corte, a un mensaje"/><p>Elige tu servicio y horario. Confirmamos tu turno por WhatsApp.</p><a className="button" href={whatsappUrl(site)} target="_blank" rel="noreferrer">Reservar por WhatsApp ↗</a><small>Confirmación sujeta a disponibilidad.</small></div><Hours hours={site.hours}/></section>
    <Location site={site}/><CTA site={site} title="Sal con tu mejor versión"/>
  </Shell>
}

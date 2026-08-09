import { SectionTitle } from './SiteChrome.jsx'

export function ServiceCard({ item }) {
  return <article className="service-card">{item.icon && <span className="service-icon">{item.icon}</span>}<div><h3>{item.name}</h3><p>{item.description}</p></div>{item.price && <strong>{item.price}</strong>}</article>
}

export function Services({ items, title = 'Servicios pensados para ti', eyebrow = 'Lo que hacemos' }) {
  return <section className="section" id="services"><SectionTitle eyebrow={eyebrow} title={title} /><div className="cards">{items.map(item => <ServiceCard item={item} key={item.name} />)}</div></section>
}

export function ProductCard({ item }) {
  return <article className="product-card"><div><span>{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><strong>{item.price}</strong></article>
}

export function Team({ people }) {
  return <section className="section" id="team"><SectionTitle eyebrow="Nuestro equipo" title="Experiencia en buenas manos" /><div className="team-grid">{people.map(person => <article className="person" key={person.name}><img src={person.image} alt={person.name} loading="lazy" /><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></section>
}

export function Testimonials({ items }) {
  return <section className="section testimonials"><SectionTitle eyebrow="Testimonios" title="Lo que dicen nuestros pacientes" /><div className="testimonial-grid">{items.map(item => <blockquote key={item.author}><span>“</span><p>{item.quote}</p><cite>{item.author}</cite></blockquote>)}</div></section>
}

export function FAQ({ items }) {
  return <section className="section faq" id="faq"><SectionTitle eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" /><div>{items.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
}

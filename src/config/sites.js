const images = {
  food: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
  ],
  clinic: [
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
  ],
  barber: [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1593702288056-f3c9f6c29802?auto=format&fit=crop&w=900&q=80',
  ],
}

const shared = {
  isDemo: true,
  demoLabel: 'Demo creada por CB Engineering & Business',
  phone: '573001234567',
  displayPhone: '+57 300 123 4567',
  email: 'hola@negocio.com',
  address: 'Carrera 7 # 72-41, Bogotá',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+7+72-41+Bogota',
  social: { instagram: 'https://instagram.com/', facebook: 'https://facebook.com/' },
}

export const sites = {
  restaurant: {
    ...shared,
    type: 'restaurant', name: 'Casa Oliva', eyebrow: 'Cocina de autor · Bogotá',
    tagline: 'Sabores honestos, momentos memorables.',
    description: 'Ingredientes locales, técnica contemporánea y una mesa preparada para disfrutar sin prisa.',
    theme: { accent: '#c87941', accentSoft: '#f4e4d7', dark: '#17130f', surface: '#fbf8f3' },
    heroImage: images.food[0], heroNote: 'Cocina local · servicio a la mesa', gallery: images.food,
    nav: [['menu', 'Menú'], ['gallery', 'Galería'], ['location', 'Visítanos']],
    primaryCta: 'Reservar mesa', whatsappMessage: 'Hola, quiero reservar una mesa en Casa Oliva.',
    highlights: ['Ingredientes locales', 'Cocina al momento', 'Reservas por WhatsApp'],
    categories: ['Entradas', 'Fuertes', 'Vegetariano', 'Postres'],
    services: [
      { name: 'Tiradito del Pacífico', category: 'Entradas', description: 'Pesca fresca, leche de tigre de mango y ají.', price: '$34.000' },
      { name: 'Arroz meloso de costa', category: 'Fuertes', description: 'Mariscos, coco tostado y hierbas frescas.', price: '$52.000' },
      { name: 'Coliflor a la brasa', category: 'Vegetariano', description: 'Crema de marañón, chimichurri y semillas.', price: '$31.000' },
      { name: 'Cacao & café', category: 'Postres', description: 'Texturas de chocolate colombiano y café.', price: '$22.000' },
    ],
    hours: [['Lun – Jue', '12:00 – 22:00'], ['Vie – Sáb', '12:00 – 23:30'], ['Domingo', '12:00 – 18:00']],
  },
  clinic: {
    ...shared,
    type: 'clinic', name: 'Clara Dental', eyebrow: 'Odontología estética y familiar',
    tagline: 'Tu sonrisa, cuidada con precisión y calma.',
    description: 'Tratamientos claros, tecnología moderna y profesionales que escuchan antes de actuar.',
    theme: { accent: '#197b75', accentSoft: '#dcefeb', dark: '#102b2a', surface: '#f7fbfa' },
    heroImage: images.clinic[0], heroNote: 'Atención clara y cercana', gallery: images.clinic,
    nav: [['services', 'Tratamientos'], ['team', 'Equipo'], ['faq', 'Preguntas']],
    primaryCta: 'Solicitar valoración', whatsappMessage: 'Hola, quiero solicitar una valoración en Clara Dental.',
    highlights: ['Atención personalizada', 'Plan de tratamiento claro', 'Agenda por WhatsApp'],
    services: [
      { name: 'Valoración integral', description: 'Diagnóstico detallado y plan de tratamiento transparente.', icon: '01' },
      { name: 'Diseño de sonrisa', description: 'Armonía dental con resultados naturales y personalizados.', icon: '02' },
      { name: 'Ortodoncia', description: 'Opciones convencionales y estéticas para cada etapa.', icon: '03' },
      { name: 'Implantología', description: 'Recupera función y confianza con atención especializada.', icon: '04' },
    ],
    team: [
      { name: 'Dra. Laura Méndez', role: 'Odontología estética', image: images.clinic[1] },
      { name: 'Dr. Mateo Ríos', role: 'Ortodoncia', image: images.clinic[2] },
    ],
    testimonials: [
      { quote: 'Aquí puede mostrarse una experiencia real sobre la claridad y el acompañamiento recibido.', author: 'Testimonio de muestra' },
      { quote: 'Este espacio está preparado para una reseña verificada de un paciente del consultorio.', author: 'Testimonio de muestra' },
    ],
    faqs: [
      ['¿La primera valoración tiene costo?', 'La valoración incluye diagnóstico y plan personalizado. Escríbenos para conocer la tarifa vigente.'],
      ['¿Atienden urgencias?', 'Sí, reservamos espacios diarios para urgencias odontológicas.'],
      ['¿Qué medios de pago reciben?', 'Aceptamos efectivo, tarjetas y transferencias bancarias.'],
    ],
    hours: [['Lun – Vie', '8:00 – 18:00'], ['Sábado', '8:00 – 13:00']],
  },
  barber: {
    ...shared,
    type: 'barber', name: 'Distrito Barber Club', eyebrow: 'Barbería contemporánea · Bogotá',
    tagline: 'Tu estilo. Bien hecho.',
    description: 'Cortes precisos, rituales de barba y un espacio pensado para bajar el ritmo.',
    theme: { accent: '#bd8a46', accentSoft: '#30291f', dark: '#11100e', surface: '#191816' },
    heroImage: images.barber[0], heroNote: 'Corte · barba · estilo', gallery: images.barber,
    nav: [['services', 'Servicios'], ['gallery', 'Trabajos'], ['team', 'Barberos']],
    primaryCta: 'Reservar turno', whatsappMessage: 'Hola, quiero reservar un turno en Distrito Barber Club.',
    highlights: ['Asesoría de estilo', 'Atención con reserva', 'Acabados precisos'],
    services: [
      { name: 'Corte clásico', description: 'Asesoría, corte y styling.', price: '$35.000' },
      { name: 'Barba ritual', description: 'Perfilado, vapor y toalla caliente.', price: '$28.000' },
      { name: 'Corte + barba', description: 'La experiencia completa.', price: '$55.000' },
      { name: 'Corte infantil', description: 'Para menores de 12 años.', price: '$28.000' },
    ],
    team: [
      { name: 'Samuel Ortiz', role: 'Barbero senior', image: images.barber[1] },
      { name: 'Nicolás Cruz', role: 'Barbero & stylist', image: images.barber[2] },
    ],
    hours: [['Lun – Vie', '9:00 – 20:00'], ['Sábado', '8:00 – 19:00'], ['Domingo', '10:00 – 16:00']],
  },
}

export const templateOptions = [
  ['restaurant', 'Restaurante'], ['clinic', 'Clínica'], ['barber', 'Barbería'],
]

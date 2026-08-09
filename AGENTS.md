# Reglas del repositorio

## Alcance

- Trabajar únicamente dentro de este repositorio.
- No publicar, desplegar ni conectar servicios de pago sin autorización explícita.
- Conservar React + Vite + JavaScript; no migrar a TypeScript o a otro framework sin aprobación.

## Arquitectura

- Mantener los datos de cada cliente en `src/config/sites.js`.
- No incrustar teléfonos, direcciones, horarios, precios o textos comerciales en componentes.
- Reutilizar componentes de `src/components` antes de crear variantes duplicadas.
- Las páginas en `src/templates` solo deben componer secciones y datos.
- Mantener la selección de plantilla compatible con el parámetro `?template=`.

## Diseño y calidad

- Diseñar mobile-first y comprobar escritorio y móvil.
- Usar variables CSS de tema; evitar colores de cliente codificados en componentes.
- Mantener HTML semántico, foco visible, textos alternativos y contraste suficiente.
- Evitar dependencias; justificar cualquier paquete nuevo.
- Ejecutar `npm run lint` y `npm run build` después de cambios funcionales.
- No confirmar `node_modules`, `dist`, secretos ni archivos `.env`.

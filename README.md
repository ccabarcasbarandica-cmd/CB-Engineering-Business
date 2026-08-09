# CB Engineering & Business — Plantillas comerciales

Colección de sitios comerciales responsive construida con React, Vite y CSS moderno. Incluye demos para restaurante, clínica odontológica y barbería.

## Uso local

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite. Puedes seleccionar una plantilla desde el selector flotante o por URL:

- `http://localhost:5173/?template=restaurant`
- `http://localhost:5173/?template=clinic`
- `http://localhost:5173/?template=barber`

## Personalización

Todo el contenido de cada negocio está en `src/config/sites.js`: identidad, colores, contacto, servicios, horarios, imágenes y enlaces. Los componentes de `src/components` no contienen datos de clientes.

Las imágenes de demostración proceden de Unsplash y pueden sustituirse por rutas locales dentro de `public/` para una entrega completamente offline.

## Publicación gratuita en GitHub Pages

El proyecto está preparado para un repositorio llamado exactamente `CB-Engineering-Business`. Durante el build, Vite utiliza `/CB-Engineering-Business/` como ruta base. El workflow `.github/workflows/deploy-pages.yml` construye y publica `dist` automáticamente desde la rama `main`.

### Primer despliegue

1. Crea en GitHub un repositorio vacío llamado `CB-Engineering-Business`. No agregues README, licencia ni `.gitignore` desde GitHub.
2. Desde esta carpeta, cambia la rama local a `main`, crea el primer commit y conecta el repositorio. Sustituye `TU_USUARIO` por tu usuario u organización:

   ```bash
   git branch -M main
   git add .
   git commit -m "feat: crear demos comerciales"
   git remote add origin https://github.com/TU_USUARIO/CB-Engineering-Business.git
   git push -u origin main
   ```

3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Abre la pestaña **Actions** y espera que termine correctamente el workflow **Deploy to GitHub Pages**.

No es necesario instalar `gh-pages` ni mantener una rama especial de publicación.

### URL pública

Para una cuenta u organización estándar, la dirección será:

```text
https://TU_USUARIO.github.io/CB-Engineering-Business/
```

Las demos conservarán sus parámetros:

- `https://TU_USUARIO.github.io/CB-Engineering-Business/?template=restaurant`
- `https://TU_USUARIO.github.io/CB-Engineering-Business/?template=clinic`
- `https://TU_USUARIO.github.io/CB-Engineering-Business/?template=barber`

La URL exacta también aparece en **Settings → Pages** y en el resultado del job `deploy` dentro de **Actions**.

### Actualizaciones posteriores

Después de modificar y validar el proyecto:

```bash
git add .
git commit -m "descripción breve del cambio"
git push origin main
```

Cada push a `main` inicia un despliegue nuevo. También puedes ejecutarlo manualmente desde **Actions → Deploy to GitHub Pages → Run workflow**.

### Problemas habituales

- **La página aparece en blanco o los recursos devuelven 404:** confirma que el repositorio se llame exactamente `CB-Engineering-Business` y que `base` en `vite.config.js` siga siendo `/CB-Engineering-Business/` para el build.
- **El workflow no inicia:** confirma que la rama publicada sea `main` y que el archivo exista en `.github/workflows/deploy-pages.yml`.
- **El deploy indica que Pages no está habilitado:** selecciona **GitHub Actions** como Source en **Settings → Pages** y vuelve a ejecutar el workflow.
- **La URL devuelve 404 inmediatamente después del deploy:** espera unos minutos, revisa que el workflow esté en verde y abre la URL mostrada por el job `deploy`.
- **Los cambios no aparecen:** recarga sin caché, comprueba que el último push llegó a `main` y revisa el workflow más reciente en Actions.
- **Las imágenes no cargan:** las demos usan imágenes públicas de Unsplash; comprueba la conexión y sustituye las URLs por archivos en `public/` si necesitas recursos locales.
- **Las demos muestran la plantilla equivocada:** conserva el parámetro después de la barra final, por ejemplo `/?template=clinic`.

## Validación local

```bash
npm run lint
npm run build
npm run preview
```

`npm run preview` permite revisar localmente el build con la ruta base de GitHub Pages.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages sirve este proyecto bajo /CB-Engineering-Business/.
  // En desarrollo se conserva la raíz para no cambiar las URLs locales.
  base: command === 'build' ? '/CB-Engineering-Business/' : '/',
}))

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      federation({
        name: 'portal_app',
        remotes: {
          rentalGenerator: env.VITE_RENTAL_GENERATOR_URL || 'http://localhost:5001/assets/remoteEntry.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'react-router-dom': { singleton: true }
        }
      })
    ],
    build: {
      target: 'esnext'
    }
  }
})

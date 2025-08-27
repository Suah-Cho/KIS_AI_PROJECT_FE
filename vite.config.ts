import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sacho',                 // ← 서브경로에서 서비스
  server: {
    host: '0.0.0.0',
    port: 10031,
    strictPort: true,
  },
})

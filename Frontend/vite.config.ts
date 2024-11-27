import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'), 'VITE_')
  
  return {
    plugins: [react()],

    envDir: 'env',
    define: {
      'process.env': env
    }
  }
})
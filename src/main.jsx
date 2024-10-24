import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NotificationHandler from './NotificationHandler.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const query = new QueryClient()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('Service Worker de Vite registrado con éxito:', registration);
    } catch (err) {
      console.error('Error al registrar el Service Worker de Vite:', err);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <NotificationHandler/>
      <App/>
    </QueryClientProvider>
  </React.StrictMode>,
)

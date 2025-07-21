import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'

// Add error boundary
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('vite:beforeUpdate')
  })
}

// Create a container for the app
const root = document.getElementById('root');

// Render the app
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
}
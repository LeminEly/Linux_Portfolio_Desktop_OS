import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/desktop.css'
import App from './App.tsx'
import ErrorBoundary from './os/components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

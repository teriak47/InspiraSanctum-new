import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { IdeasProvider } from './contexts/IdeasContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <IdeasProvider>
          <App />
        </IdeasProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

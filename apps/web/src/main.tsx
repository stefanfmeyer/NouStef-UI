import React from 'react';
import ReactDOM from 'react-dom/client';
import { HermesUiProvider } from '@hermes-recipes/ui';
import { App } from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HermesUiProvider>
      <App />
    </HermesUiProvider>
  </React.StrictMode>
);

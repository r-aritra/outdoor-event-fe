import ReactDOM from 'react-dom/client';
import './config/translations/i18n';
import { StrictMode } from 'react';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

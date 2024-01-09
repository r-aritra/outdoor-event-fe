import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './config/translations/i18n';

import App from './App';
import { worker } from './test/mocks/browser';

worker.start({
  onUnhandledRequest: 'bypass',
});

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

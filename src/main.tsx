import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './test/mocks/browser';

worker.start({
  onUnhandledRequest: 'bypass',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

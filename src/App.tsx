import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Auth } from './pages/auth/Auth';
import Otp from './pages/auth/Otp';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/otpVerification" element={<Otp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

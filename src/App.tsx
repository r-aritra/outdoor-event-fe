import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/auth/Auth'
import Otp from './pages/auth/Otp'
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/otpVerification" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import SeatAllocator from './SeatAllocator';

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/seat-allocator" element={<SeatAllocator />} />
    </Routes>
  </Router>
  
  )
}

export default App;

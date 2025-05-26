// client/src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Calculate from './pages/Calculate';
import Register from './pages/Register';
import Login from './pages/login';
import Logout from './components/logout';
import Profile from './pages/profile';
import Header from './components/Header';
import './index.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      {isLoggedIn && <Header />}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/calculate" element={isLoggedIn ? <Calculate /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;

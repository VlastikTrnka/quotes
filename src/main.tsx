import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import Home from './components/Home.tsx';
import UserProfile from './components/UserProfile.tsx';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <>
      <nav className='navbar'>
        <ul>
          {!isLoggedIn ? (
            <>
              <li><Link to={"/login"}>Login</Link></li>
              <li><Link to={"/register"}>Register</Link></li>
              <li><Link to={"/"}>Home</Link></li>
            </>
          ) : (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

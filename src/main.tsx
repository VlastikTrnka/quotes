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

  // Při načtení aplikace vždy smaže token z localStorage
  useEffect(() => {
    localStorage.removeItem('token'); // Uživatel je vždy odhlášen při spuštění aplikace
    setIsLoggedIn(false); // Nastaví stav na odhlášený
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Odstranění tokenu při logoutu
    setIsLoggedIn(false); // Aktualizace stavu na odhlášený
    navigate('/login'); // Přesměrování na login stránku
  };

  return (
    <>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <>
              <li><Link to={"/login"}>Login</Link></li>
              <li><Link to={"/register"}>Register</Link></li>
              <li><Link to={"/"}>Home</Link></li>
            </>
          ) : (
            <>
              <li><Link to={"/userprofile"}>User Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
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

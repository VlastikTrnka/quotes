import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login( {onLogin} : {onLogin: () => void} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const twoFactorCode = '';
  const twoFactorRecoveryCode = '';
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5136/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, twoFactorCode, twoFactorRecoveryCode})
    });

    console.log(JSON.stringify({email, password, twoFactorCode, twoFactorRecoveryCode}));
    console.log(response);

    if (!response.ok){
      return;
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem("token", data.accessToken);

    onLogin();

    // Přesměrování na stránku pro správu citátů po úspěšném přihlášení
    navigate('/userprofile');
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;

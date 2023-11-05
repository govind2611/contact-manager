import React, { useEffect, useState } from 'react';
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const uri = process.env.REACT_APP_BACKEND_URI;

  useEffect(() => {
    const userToken = localStorage.getItem("contact-token");
    if (userToken) {
      window.location.href = "/dashboard"; 
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${uri}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === 400) {
        alert(data.message);
        return;
      }

      if (data) {
        alert(data.message);
        localStorage.setItem("contact-token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page-3">
      <div className="content-3">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

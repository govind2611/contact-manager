import React, { useEffect, useState } from "react";
import "./Register.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const uri = process.env.REACT_APP_BACKEND_URI;

  useEffect(() => {
    const userToken = localStorage.getItem("contact-token");
    if (userToken) {
      window.location.href = "/dashboard"; 
    }
  }, [])
  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${uri}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
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
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-page-1">
      <div className="content-1">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group-1">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

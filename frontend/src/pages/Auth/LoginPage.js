import React, { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../assets/logo/longlogo2.png";
import BasicMenu from "../../components/Header/ProfileMenu";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setUserLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setUserLogin(data.user);

      // Check if there's a redirect destination stored
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin'); // Clean up
        navigate(redirectPath);
      } else {
        navigate("/"); // Default redirect to homepage
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  }

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <img
              src={logo}
              alt="longlogo2"
              className="navbar-logo"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="profile-container">
            <div className="profile-div">
              <BasicMenu />
            </div>
          </div>
        </div>
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input">
                <p>Email</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input">
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <p className="reset">Forgot password?</p>
            <button type="submit" className="login-button">
                <p>Login</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

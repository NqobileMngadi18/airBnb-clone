import React, { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";
import logo from "../../assets/logo/longlogo2.png";
import BasicMenu from "../../components/Header/ProfileMenu";
import HomePage from "../Home/HomePage";

  

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setUserLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setUserLogin(data.user);
      window.location.href = "/"; // redirect to homepage or dashboard
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  }

  return (
    <div>
      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <img src={logo} alt="longlogo2" className="navbar-logo" onClick={HomePage} />
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
                <p>Username</p>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input">
                <p>Password</p>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <p className="reset">Forgot password?</p>
            <div type="submit" className="login-button">
                <p>Login</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

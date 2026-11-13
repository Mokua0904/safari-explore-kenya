import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../Components/AuthLayout";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/auth.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const isFormFilled = credentials.email.trim() !== "" && credentials.password.trim() !== "";

  return (
    <AuthLayout 
      title="Welcome!" 
      subtitle="Log in to Safari Explore Kenya to continue to the Super App."
    >
      {/* ERROR SHAKE ANIMATION */}
      <motion.div
        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}
      </motion.div>

      <div className="social-buttons">
        <button className="social-btn" type="button">
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Log in with Google
        </button>
        <button className="social-btn" type="button">
          <svg viewBox="0 0 24 24"><path fill="#fff" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.05 2.95.67 3.78 1.73-3.4 2.04-2.83 6.42.6 7.83-.53 1.56-1.32 3.02-2.84 4.3zm-3.31-15.1c.73-1.05 1.38-2.32 1.15-3.58-1.04.08-2.29.75-2.97 1.63-.63.8-1.24 2.03-1.04 3.24 1.13.09 2.26-.5 2.86-1.29z"/></svg>
          Log in with Apple
        </button>
      </div>

      <div className="divider">OR</div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              value={credentials.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">
            Password 
            <Link to="/forgot-password">Forgot password?</Link>
          </label>
          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Enter your password" 
              value={credentials.password}
              onChange={handleChange}
              required 
            />
            <button 
              type="button" 
              className="eye-toggle" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              )}
            </button>
          </div>
        </div>

        <motion.button 
          type="submit" 
          className={`login-btn ${isFormFilled ? "active" : ""}`}
          disabled={!isFormFilled || loading || success}
          whileTap={{ scale: 0.97 }}
          style={success ? { backgroundColor: "#28a745", color: "#fff", borderColor: "#28a745" } : {}}
        >
          {success ? "Success!" : loading ? "Logging in..." : "Log in"}
        </motion.button>
      </form>

      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
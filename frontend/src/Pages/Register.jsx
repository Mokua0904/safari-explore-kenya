import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../Components/AuthLayout";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/auth.css";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [wantsVendor, setWantsVendor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...credentials, wantsVendor }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Registration failed.");
        setLoading(false);
        return;
      }

      alert("Account created successfully! Please log in.");
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join Safari Explore Kenya to start your journey."
    >
      <motion.div
        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <input 
              type="text" 
              id="username" 
              placeholder="e.g. SafariExplorer" 
              value={credentials.username}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

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
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input 
              type="password" 
              id="password" 
              placeholder="Create a strong password" 
              value={credentials.password}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-check mb-3">
          <input 
            type="checkbox" 
            id="wantsVendor" 
            className="form-check-input" 
            checked={wantsVendor}
            onChange={(e) => setWantsVendor(e.target.checked)}
          />
          <label htmlFor="wantsVendor" className="form-check-label small">
            I want to become a vendor (hotel, safari, or transport)
          </label>
        </div>

        <motion.button 
          type="submit" 
          className="login-btn active w-100"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </motion.button>
      </form>

      <div className="signup-link">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
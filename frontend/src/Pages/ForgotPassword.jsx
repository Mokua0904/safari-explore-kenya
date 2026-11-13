import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../Components/AuthLayout";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate API call for now
    setTimeout(() => {
      setMessage("If an account with that email exists, a password reset link has been sent.");
      setLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email and we will send you a link to reset your password."
    >
      {message && <div className="alert alert-success py-2" style={{ fontSize: "0.85rem" }}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your registered email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
        </div>

        <motion.button 
          type="submit" 
          className="login-btn active w-100"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>

      <div className="signup-link">
        Remember your password? <Link to="/login">Back to Login</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
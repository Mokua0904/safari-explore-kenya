import React from "react";
import { motion } from "framer-motion";
import "../styles/auth.css";

const AuthLayout = ({ children, title, subtitle }) => {
  // Animation variants for the form container
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* LEFT PANEL: FORM */}
      <div className="auth-left">
        <header className="auth-header">
          <div className="auth-brand">
            <div className="auth-brand-icon"></div>
            Safari<span>Explore</span>Kenya
          </div>
          <select className="auth-lang-select">
            <option>English</option>
            <option>Swahili</option>
          </select>
        </header>

        <motion.div 
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </motion.div>
      </div>

      {/* RIGHT PANEL: SHOWCASE */}
      <div className="auth-right">
        <motion.div 
          className="auth-showcase-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="auth-headline">
            Explore the Magic of <br />
            <span>Kenya in Ultimate Luxury</span>
          </h2>
          <div className="auth-visual-container">
            <div className="auth-orbit-ring"></div>
            <div className="auth-orbit-dot"></div>
            {/* Floating Safari Visual */}
            <motion.img 
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop" 
              alt="Safari Visual" 
              className="auth-safari-visual"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
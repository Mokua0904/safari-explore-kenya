import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/login.css";
import loginImg from "../assest/images/login.png";
import userIcon from "../assest/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(null); 
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      setSuccessMsg(`Welcome back, ${result.data.username}! Redirecting...`);
      
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  let statusMessage = "Welcome back! Please enter your details to continue.";
  let messageColor = "#555"; 

  if (loading && !successMsg) {
    statusMessage = "Authenticating your secure session...";
    messageColor = "#ff7e01"; 
  } else if (successMsg) {
    statusMessage = successMsg;
    messageColor = "#28a745"; 
  } else if (error) {
    statusMessage = error;
    messageColor = "#dc3545"; 
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              
              <motion.div 
                className="login__img"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img src={loginImg} alt="" />
              </motion.div>

              <motion.div 
                className="login__form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="user">
                  <img src={userIcon} alt="" />
                </motion.div>
                
                <motion.h2 variants={itemVariants}>Login</motion.h2>

                <div style={{ height: "40px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={statusMessage}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: messageColor, fontWeight: "600", fontSize: "0.9rem", margin: 0, textAlign: "center" }}
                    >
                      {statusMessage}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <Form onSubmit={handleClick}>
                  <motion.div variants={itemVariants}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        required
                        disabled={loading || successMsg}
                      />
                    </FormGroup>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        required
                        disabled={loading || successMsg}
                      />
                    </FormGroup>
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-end mb-3">
                    <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "#ff7e01", fontWeight: "600" }}>
                      Forgot Password?
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      whileHover={!loading && !successMsg ? { scale: 1.02 } : {}}
                      whileTap={!loading && !successMsg ? { scale: 0.98 } : {}}
                      className="btn secondary__btn auth__btn w-100"
                      type="submit"
                      disabled={loading || successMsg}
                      style={{
                        backgroundColor: successMsg ? "#28a745" : "", 
                        color: successMsg ? "#fff" : ""
                      }}
                    >
                      {loading ? "Logging in..." : successMsg ? "Success!" : "Login"}
                    </motion.button>
                  </motion.div>
                </Form>

                <motion.p variants={itemVariants} className="mt-3">
                  Don't have an account? <Link to="/register">Create</Link>
                </motion.p>
              </motion.div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
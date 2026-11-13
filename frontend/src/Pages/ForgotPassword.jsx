import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/login.css"; 
import userIcon from "../assest/images/user.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate an API call for now
    setTimeout(() => {
      setMessage("If an account with that email exists, a password reset link has been sent.");
      setLoading(false);
    }, 1500);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <motion.div 
              className="login__container p-5"
              style={{ backgroundColor: "#fff", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "block" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="login__form" style={{ width: "100%", padding: "0" }}>
                <div className="user text-center mb-4">
                  <img src={userIcon} alt="" style={{ width: "60px" }} />
                </div>
                <h2 className="text-center mb-3">Reset Password</h2>
                <p className="text-center text-muted mb-4">
                  Enter your email and we will send you a link to reset your password.
                </p>

                {message && <div className="alert alert-success">{message}</div>}

                <Form onSubmit={handleSubmit}>
                  <FormGroup className="mb-4">
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", width: "100%" }}
                    />
                  </FormGroup>
                  
                  <Button className="btn secondary__btn auth__btn w-100" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Form>
                
                <p className="text-center mt-4">
                  Remember your password? <Link to="/login">Back to Login</Link>
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;
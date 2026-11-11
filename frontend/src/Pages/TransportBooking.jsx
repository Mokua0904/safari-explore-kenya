import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const TransportBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIXED: Grab 'transport' instead of 'vehicle' to match Transport.jsx
  const transport = location.state?.transport || {};

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    date: "",
    mpesaNumber: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send booking to backend
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userEmail: user.email,
          tourName: transport.title || "Transport Booking",
          fullName: formData.fullName,
          phone: formData.phone,
          date: formData.date,
          totalPrice: transport.price || 5000,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Transport booked successfully!");
        navigate("/thank-you"); // Goes to thank you page, NOT dashboard
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container>
        <Row>
          {/* LEFT SIDE: TRANSPORT DETAILS (Using transport.xxx) */}
          <Col lg="5" className="mb-4">
            <div className="bg-white p-4 rounded shadow-sm border text-center">
              <img
                src={transport.photo}
                alt={transport.title || "Transport"}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
              />
              <h3 className="fw-bold">{transport.title || "VIP Transport"}</h3>
              <p className="text-muted">{transport.desc || "Premium transport across Kenya."}</p>
              <h4 className="text-warning fw-bold">
                KES {transport.price?.toLocaleString() || "5,000"}
              </h4>
            </div>
          </Col>

          {/* RIGHT SIDE: BOOKING FORM */}
          <Col lg="7">
            <div className="bg-white p-4 rounded shadow-sm border">
              <h3 className="mb-4 fw-bold">Complete Your Booking</h3>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <label>Travel Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <hr className="my-4" />
                <h5 className="mb-3">Payment Method</h5>

                {/* PAYMENT TOGGLE */}
                <div className="d-flex gap-4 mb-3">
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="mpesa"
                      checked={paymentMethod === "mpesa"}
                      onChange={() => setPaymentMethod("mpesa")}
                    />
                    <label className="form-check-label fw-bold" htmlFor="mpesa">
                      📱 M-Pesa
                    </label>
                  </FormGroup>
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <label className="form-check-label fw-bold" htmlFor="card">
                      💳 Credit Card
                    </label>
                  </FormGroup>
                </div>

                {/* MPESA FORM */}
                {paymentMethod === "mpesa" && (
                  <div className="bg-light p-3 rounded mb-3">
                    <FormGroup>
                      <label>M-Pesa Number (e.g. 254712345678)</label>
                      <input
                        type="text"
                        id="mpesaNumber"
                        className="form-control"
                        value={formData.mpesaNumber}
                        onChange={handleChange}
                        placeholder="Enter M-Pesa Number"
                        required
                      />
                    </FormGroup>
                    <small className="text-muted">You will receive an STK push to complete payment.</small>
                  </div>
                )}

                {/* CARD FORM */}
                {paymentMethod === "card" && (
                  <div className="bg-light p-3 rounded mb-3">
                    <FormGroup>
                      <label>Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="form-control mb-2"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </FormGroup>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            id="expiry"
                            className="form-control"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>CVV</label>
                          <input
                            type="password"
                            id="cvv"
                            className="form-control"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}

                <Button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold text-dark mt-3"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay KES ${transport.price?.toLocaleString() || "5,000"}`}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TransportBooking;
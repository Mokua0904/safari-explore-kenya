import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input, Label } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const ProductCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Get the product data passed from the Shop page
  const product = location.state?.product;

  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "delivery" or "pickup"
  const [pickupLocation, setPickupLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    fullName: user?.username || "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Ensure quantity is stored as a number
    setBookingDetails({ 
      ...bookingDetails, 
      [id]: id === "quantity" ? parseInt(value) || 1 : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to make a purchase.");
      return navigate("/login");
    }

    // Manual Validation for safety
    if (!bookingDetails.phone) return alert("Please enter your M-Pesa phone number.");
    if (deliveryMethod === "delivery" && !bookingDetails.address) return alert("Please enter a delivery address.");
    if (deliveryMethod === "pickup" && !pickupLocation) return alert("Please select a pickup station.");

    setLoading(true);
    const totalPrice = product.price * bookingDetails.quantity;

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            ...bookingDetails,
            deliveryMethod: deliveryMethod,
            pickupLocation: deliveryMethod === "pickup" ? pickupLocation : null,
            tourName: product.title,
            totalPrice: totalPrice,
            type: "Souvenir"
        }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        alert(result.message || "Failed to process order.");
        return;
      }

      alert(`Order Successful! ${deliveryMethod === "pickup" ? "You will receive a notification when it's ready for pickup." : "Your souvenir will be shipped."}`);
      navigate("/thank-you");
      
    } catch (err) {
      console.error(err);
      alert("Network error. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-5 pt-5">
        <h2>No Product Selected.</h2>
        <button onClick={() => navigate("/shop")} className="btn btn-warning mt-3">Go back to Shop</button>
      </div>
    );
  }

  return (
    <section style={{ padding: "120px 0", backgroundColor: "#fcfbf9" }}>
      <Container>
        <Row>
          {/* LEFT SIDE: FORM */}
          <Col lg="7" className="mb-4">
            <div className="bg-white p-5 rounded shadow-sm h-100">
              <h2 className="mb-4 fw-bold">Checkout</h2>
              
              <Form onSubmit={handleSubmit}>
                
                {/* DELIVERY METHOD TOGGLE */}
                <FormGroup tag="fieldset" className="mb-4 p-3 bg-light rounded border">
                  <legend className="h6 fw-bold mb-3">How would you like to receive your order?</legend>
                  <div className="d-flex gap-4">
                    <FormGroup check>
                      <Input 
                        type="radio" 
                        name="deliveryMethod" 
                        checked={deliveryMethod === "delivery"} 
                        onChange={() => setDeliveryMethod("delivery")} 
                      />
                      <Label check className="fw-bold"> Home Delivery</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input 
                        type="radio" 
                        name="deliveryMethod" 
                        checked={deliveryMethod === "pickup"} 
                        onChange={() => setDeliveryMethod("pickup")} 
                      />
                      <Label check className="fw-bold"> Pickup Station</Label>
                    </FormGroup>
                  </div>
                </FormGroup>

                <Row>
                  <Col md="12">
                    <FormGroup className="mb-3">
                      <label>Full Name</label>
                      <input type="text" id="fullName" className="form-control" value={bookingDetails.fullName} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  
                  <Col md="12">
                    <FormGroup className="mb-3">
                      <label>Phone Number (M-Pesa)</label>
                      <input type="text" id="phone" className="form-control" onChange={handleChange} required placeholder="+254..." />
                    </FormGroup>
                  </Col>

                  {/* CONDITIONAL RENDERING: ADDRESS VS PICKUP */}
                  {deliveryMethod === "delivery" ? (
                    <Col md="12">
                      <FormGroup className="mb-3">
                        <label>Delivery Address</label>
                        <input type="text" id="address" className="form-control" onChange={handleChange} required placeholder="Street, City, Country" />
                      </FormGroup>
                    </Col>
                  ) : (
                    <Col md="12">
                      <FormGroup className="mb-3">
                        <label>Select Pickup Station</label>
                        <Input 
                          type="select" 
                          value={pickupLocation} 
                          onChange={(e) => setPickupLocation(e.target.value)}
                          required
                        >
                          <option value="">-- Choose a station --</option>
                          <option value="Nairobi CBD - Bazaar Plaza">Nairobi CBD - Bazaar Plaza (Moi Avenue)</option>
                          <option value="Westlands - Sarit Centre">Westlands - Sarit Centre</option>
                          <option value="Mombasa - City Mall">Mombasa - City Mall</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  )}

                  <Col md="12">
                    <FormGroup className="mb-4">
                      <label>Quantity</label>
                      <input type="number" id="quantity" className="form-control" min="1" max={product.stock || 99} value={bookingDetails.quantity} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>

                <Button 
                  type="submit" 
                  className="btn btn-warning w-100 fw-bold py-3 fs-5 text-dark mt-3"
                  disabled={loading}
                >
                  {loading ? "Processing Payment..." : `Pay Ksh ${(product.price * bookingDetails.quantity).toLocaleString()}`}
                </Button>
              </Form>
            </div>
          </Col>

          {/* RIGHT SIDE: SUMMARY */}
          <Col lg="5">
            <div className="bg-white p-4 rounded shadow-sm border-top border-warning border-4">
              <img src={product.photo} alt={product.title} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} className="mb-3" />
              <h5 className="fw-bold">{product.title}</h5>
              <p className="text-muted mb-3"><i className="ri-shopping-bag-line text-warning"></i> {product.category}</p>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Price per item:</span>
                <span className="fw-bold">Ksh {product.price.toLocaleString()}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Quantity:</span>
                <span className="fw-bold">{bookingDetails.quantity}</span>
              </div>

              <hr />
              
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold">Total:</span>
                <span className="fs-3 fw-bold text-warning">Ksh {(product.price * bookingDetails.quantity).toLocaleString()}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductCheckout;
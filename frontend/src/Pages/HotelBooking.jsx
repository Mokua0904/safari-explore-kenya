import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const HotelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const hotel = location.state?.hotel;

  const [bookingDetails, setBookingDetails] = useState({
    fullName: user?.username || "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    mpesaNumber: "", // Added for the payment UI
  });

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Auto-calculate nights and total price
  useEffect(() => {
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      const start = new Date(bookingDetails.checkIn);
      const end = new Date(bookingDetails.checkOut);
      const timeDiff = end.getTime() - start.getTime();
      const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (nightCount > 0) {
        setNights(nightCount);
        if (hotel) setTotalPrice(nightCount * hotel.pricePerNight);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [bookingDetails.checkIn, bookingDetails.checkOut, hotel]);

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to make a booking.");
      return navigate("/login");
    }

    if (nights <= 0) {
      return alert("Check-out date must be after check-in date.");
    }

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            ...bookingDetails,
            tourName: hotel.title,
            totalPrice: totalPrice,
            type: "Hotel",
            nights: nights
        }),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      alert("Hotel Booking Successful! Payment simulated via M-Pesa.");
      navigate("/thank-you");
    } catch (err) {
      alert("Something went wrong. Check if backend is running.");
    }
  };

  if (!hotel) {
    return (
      <div className="text-center mt-5 pt-5">
        <h2>No Hotel Selected.</h2>
        <button onClick={() => navigate("/hotels")} className="btn btn-warning mt-3">Go back to Luxury Stays</button>
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
              <h2 className="mb-4 fw-bold">Reserve Your Stay</h2>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6"><FormGroup className="mb-3"><label>Full Name</label><input type="text" id="fullName" className="form-control" value={bookingDetails.fullName} onChange={handleChange} required /></FormGroup></Col>
                  <Col md="6"><FormGroup className="mb-3"><label>Phone Number</label><input type="text" id="phone" className="form-control" onChange={handleChange} required placeholder="+254..." /></FormGroup></Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label>Check In</label>
                      <input type="date" id="checkIn" className="form-control" onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label>Check Out</label>
                      <input type="date" id="checkOut" className="form-control" onChange={handleChange} required min={bookingDetails.checkIn || new Date().toISOString().split("T")[0]} />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup className="mb-3">
                      <label>Number of Guests</label>
                      <input type="number" id="guests" className="form-control" min="1" max="10" value={bookingDetails.guests} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>

                {/* M-PESA PAYMENT UI */}
                <div className="mb-4 p-4 bg-light rounded border border-warning">
                  <h6 className="fw-bold mb-3 d-flex align-items-center">
                     <span className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center me-2" style={{width: "20px", height: "20px", fontSize: "12px"}}>M</span>
                     Payment Method
                  </h6>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <input type="radio" name="payment" value="Mpesa" defaultChecked />
                    <span className="fw-bold text-success">Pay with M-Pesa (STK Push)</span>
                  </div>
                  <FormGroup className="mb-0">
                    <input 
                      type="tel" 
                      id="mpesaNumber"
                      className="form-control" 
                      placeholder="Enter M-Pesa Phone Number (e.g., 0712345678)" 
                      onChange={handleChange}
                      required 
                    />
                    <small className="text-muted d-block mt-2">An STK push will be sent to your phone to complete the payment.</small>
                  </FormGroup>
                </div>

                <Button type="submit" className="btn btn-warning w-100 fw-bold py-3 fs-5 text-dark">
                  Confirm Booking & Pay Ksh {totalPrice.toLocaleString()}
                </Button>
              </Form>
            </div>
          </Col>

          {/* RIGHT SIDE: SUMMARY */}
          <Col lg="5">
            <div className="bg-white p-4 rounded shadow-sm border-top border-warning border-4">
              <img src={hotel.photo} alt={hotel.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} className="mb-3" />
              <h5 className="fw-bold">{hotel.title}</h5>
              <p className="text-muted mb-3"><i className="ri-map-pin-line text-warning"></i> {hotel.city}</p>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Price per night:</span>
                <span className="fw-bold">Ksh {hotel.pricePerNight.toLocaleString()}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Nights:</span>
                <span className="fw-bold">{nights}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Guests:</span>
                <span className="fw-bold">{bookingDetails.guests}</span>
              </div>

              <hr />
              
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold">Total:</span>
                <span className="fs-3 fw-bold text-warning">Ksh {totalPrice.toLocaleString()}</span>
              </div>

              {hotel.hasResidentRate && (
                <div className="mt-3 p-2 bg-light rounded text-center">
                  <small className="text-muted"><i className="ri-shield-check-line text-success"></i> Resident Rate Available (ID required at check-in)</small>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HotelBooking;
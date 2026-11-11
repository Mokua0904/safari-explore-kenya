import React, { useState, useContext } from "react";
import "./Booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  // --- IMPROVEMENT 1: Added Payment States ---
  const [paymentMethod, setPaymentMethod] = useState("Mpesa");
  const [paymentDetail, setPaymentDetail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Current Booking Data:", booking);

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      // --- IMPROVEMENT 2: Payment Validation ---
      if (!paymentDetail) {
        return alert(`Please enter your ${paymentMethod} details.`);
      }

      setIsProcessing(true);

      // --- IMPROVEMENT 3: Map your original variables to the backend model ---
      // The backend requires 'guests', 'date', 'totalPrice', and 'type'
      const finalPayload = {
        ...booking,
        userId: user._id || user.id,
        userEmail: user.email,
        guests: booking.guestSize, // Mapping your guestSize to guests
        date: booking.bookAt,      // Mapping your bookAt to date
        totalPrice: totalAmount,
        type: "Safari",
        paymentMethod: paymentMethod,
      };

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finalPayload),
      });

      const result = await res.json();

      if (!res.ok) {
        setIsProcessing(false);
        return alert(result.message || "Booking failed");
      }
      
      alert(`Payment Successful via ${paymentMethod}!`);
      navigate("/thank-you");
    } catch (error) {
      setIsProcessing(false);
      alert(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          Ksh {price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =============== BOOKING FORM START ============== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
              value={booking.guestSize}
              min="1"
            />
          </FormGroup>

          {/* --- IMPROVEMENT 4: Added the M-Pesa and Card UI here --- */}
          <div className="p-3 mt-3 bg-light rounded border border-warning">
            <h6 className="fw-bold mb-3">Select Payment Method</h6>
            
            <div className="d-flex gap-4 mb-3">
              <label className="d-flex align-items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="Mpesa" 
                  checked={paymentMethod === "Mpesa"} 
                  onChange={() => setPaymentMethod("Mpesa")} 
                />
                <span className="fw-bold text-success">M-Pesa</span>
              </label>
              <label className="d-flex align-items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="Card" 
                  checked={paymentMethod === "Card"} 
                  onChange={() => setPaymentMethod("Card")} 
                />
                <span className="fw-bold text-primary">Credit Card</span>
              </label>
            </div>

            <input 
              type={paymentMethod === "Card" ? "text" : "tel"}
              className="form-control" 
              placeholder={paymentMethod === "Mpesa" ? "Enter M-Pesa Number (e.g., 0712345678)" : "Enter Card Number (e.g., 4242 4242 4242)"} 
              onChange={(e) => setPaymentDetail(e.target.value)}
              required 
            />
            <small className="text-muted d-block mt-2">
              {paymentMethod === "Mpesa" ? "An STK push will be sent to your phone." : "Your card will be securely processed."}
            </small>
          </div>
        </Form>
      </div>
      {/* =============== BOOKING FORM END ================ */}

      {/* =============== BOOKING BOTTOM ================ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              Ksh {price} <i className="ri-close-line"></i> {booking.guestSize} person
            </h5>
            <span>Ksh {price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>Ksh {serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>Ksh {totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button 
          className="btn primary__btn w-100 mt-4" 
          onClick={handleClick}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Book Now"}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
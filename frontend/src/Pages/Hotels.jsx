import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Subtitle from "../Shared/Subtitle";
import Searchbar from "../Shared/Searchbar";
import { BASE_URL } from "../utils/config";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${BASE_URL}/hotels`);
        const result = await res.json();
        if (result.success) {
          setHotels(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleBookHotel = (hotel) => {
    navigate(`/hotel-booking`, { state: { hotel } });
  };

  return (
    <>
      <section style={{ padding: "120px 0 60px 0", backgroundColor: "#fcfbf9" }}>
        <Container>
          <div className="text-center mb-5">
            <Subtitle Subtitle={"Premium Accommodation"} />
            <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#0f172a", marginTop: "10px" }}>
              Luxury Stays in Kenya
            </h1>
            <p style={{ color: "#555", maxWidth: "700px", margin: "0 auto" }}>
              From iconic Nairobi manors to exclusive safari camps, explore our curated collection.
            </p>
            <div className="d-flex justify-content-center mt-4">
                <Searchbar fixedExperience="Hotel" />
            </div>
          </div>
        </Container>
      </section>

      <section style={{ paddingBottom: "80px" }}>
        <Container>
          {loading ? (
            <h4 className="text-center">Loading luxury stays...</h4>
          ) : (
            <Row>
              {hotels.map((hotel) => (
                <Col lg="4" md="6" sm="12" className="mb-4" key={hotel._id}>
                  <div className="tour__card" style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "100%", backgroundColor: "white" }}>
                    <div className="tour__img" style={{ height: "240px", position: "relative" }}>
                      <img src={hotel.photo} alt={hotel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {hotel.hasResidentRate && (
                        <span style={{ position: "absolute", top: "15px", right: "15px", backgroundColor: "#0f172a", color: "#ffb703", padding: "6px 12px", borderRadius: "5px", fontSize: "0.75rem", fontWeight: "bold" }}>
                          Resident Rate
                        </span>
                      )}
                    </div>
                    <div className="tour__content p-4 d-flex flex-column" style={{ height: "calc(100% - 240px)" }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="text-dark fw-bold mb-0" style={{ fontSize: "1.2rem" }}>{hotel.title}</h5>
                        <span className="text-warning fw-bold" style={{ fontSize: "0.9rem" }}><i className="ri-star-fill"></i> {hotel.rating}</span>
                      </div>
                      <p className="text-muted mb-3"><i className="ri-map-pin-line text-warning"></i> {hotel.city}</p>
                      <p className="text-muted mb-4" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>{hotel.desc.substring(0, 90)}...</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <div>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>From</span><br/>
                          <span className="fw-bold text-dark fs-5">Ksh {hotel.pricePerNight.toLocaleString()}</span>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}> /night</span>
                        </div>
                        <button onClick={() => handleBookHotel(hotel)} className="btn btn-warning rounded-pill px-4 fw-bold">Book Stay</button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Hotels;
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Subtitle from "../Shared/Subtitle";

const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section style={{ padding: "120px 0 60px 0", backgroundColor: "#0f172a", color: "white", textAlign: "center" }}>
        <Container>
          <Subtitle Subtitle={"Our Story"} />
          <h1 style={{ fontSize: "3.5rem", fontWeight: "800", marginTop: "15px" }}>
            Redefining Kenyan Travel
          </h1>
          <p style={{ maxWidth: "700px", margin: "20px auto", fontSize: "1.1rem", color: "#cbd5e1" }}>
            Safari Explore Kenya was born out of a simple vision: to create a single, trusted platform where the world can experience the unmatched beauty, culture, and hospitality of Kenya.
          </p>
        </Container>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: "80px 0", backgroundColor: "#fcfbf9" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg="6" className="mb-4 mb-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop" 
                alt="Kenyan Safari" 
                style={{ width: "100%", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }} 
              />
            </Col>
            <Col lg="6" className="ps-lg-5">
              <h2 style={{ fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
                Connecting You to the Heart of Africa
              </h2>
              <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "15px" }}>
                We understand that planning a trip to Africa can be overwhelming. There are hundreds of operators, hidden fees, and fragmented booking systems. We built this Super App to solve that.
              </p>
              <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "30px" }}>
                Whether you are looking for a $5,000-a-night luxury safari at Mara Bushtops, an authentic cultural experience on a custom Nganya, or a simple JKIA airport transfer, we bring everything under one roof. 
              </p>
              <div className="d-flex gap-4">
                <div>
                   <h3 style={{ fontWeight: "800", color: "#ffb703", margin: 0 }}>10+</h3>
                   <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Years Experience</p>
                </div>
                <div>
                   <h3 style={{ fontWeight: "800", color: "#ffb703", margin: 0 }}>5k+</h3>
                   <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Happy Clients</p>
                </div>
                <div>
                   <h3 style={{ fontWeight: "800", color: "#ffb703", margin: 0 }}>47</h3>
                   <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Counties Covered</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WHY CHOOSE US CARDS */}
      <section style={{ padding: "80px 0", backgroundColor: "white" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontWeight: "800", color: "#0f172a" }}>Why Book With Us?</h2>
            <p style={{ color: "#555" }}>The Safari Explore Kenya difference</p>
          </div>
          
          <Row>
            <Col lg="4" md="6" className="mb-4">
              <div className="p-4 text-center rounded shadow-sm border h-100" style={{ backgroundColor: "#f8fafc" }}>
                <div className="mb-3 text-warning" style={{ fontSize: "3rem" }}>
                  <i className="ri-shield-check-line"></i>
                </div>
                <h5 className="fw-bold text-dark">Verified Partners Only</h5>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>Every hotel, safari guide, and transport provider is vetted by our team to ensure your safety and comfort.</p>
              </div>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <div className="p-4 text-center rounded shadow-sm border h-100" style={{ backgroundColor: "#f8fafc" }}>
                <div className="mb-3 text-success" style={{ fontSize: "3rem" }}>
                  <i className="ri-money-dollar-circle-line"></i>
                </div>
                <h5 className="fw-bold text-dark">Transparent Pricing</h5>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>No hidden fees. Pay directly via M-Pesa or Card. What you see at checkout is exactly what you pay.</p>
              </div>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <div className="p-4 text-center rounded shadow-sm border h-100" style={{ backgroundColor: "#f8fafc" }}>
                <div className="mb-3 text-primary" style={{ fontSize: "3rem" }}>
                  <i className="ri-customer-service-2-line"></i>
                </div>
                <h5 className="fw-bold text-dark">24/7 Concierge</h5>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>Our support team is available around the clock to handle any changes, transfers, or emergencies.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ padding: "60px 0", backgroundColor: "#0f172a", color: "white", textAlign: "center" }}>
        <Container>
          <h2 style={{ fontWeight: "800", marginBottom: "20px" }}>Ready to Explore Kenya?</h2>
          <p style={{ marginBottom: "30px", color: "#cbd5e1" }}>Let us handle the logistics while you make the memories.</p>
          <Link to="/tours">
             <Button className="btn btn-warning px-5 py-3 fw-bold fs-5 text-dark rounded-pill">
                Browse Safaris
             </Button>
          </Link>
        </Container>
      </section>
    </>
  );
};

export default About;
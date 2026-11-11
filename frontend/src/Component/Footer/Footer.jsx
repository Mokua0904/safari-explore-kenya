import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const quick__links = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Luxury Safaris" },
  { path: "/hotels", display: "Premium Stays" },
  { path: "/transport", display: "VIP Transport" },
  { path: "/shop", display: "Souvenirs" },
];

const quick_links2 = [
  { path: "/about", display: "About Us" },
  { path: "/login", display: "Login" },
  { path: "/register", display: "Register" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* BRAND & DESCRIPTION */}
          <Col lg="4" md="6" className="mb-4">
            <div className="logo">
              <h3 className="text-white fw-bold mb-3" style={{ letterSpacing: "2px" }}>
                SAFARI <span className="text-warning">EXPLORE</span>
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                Your premier gateway to high-end Kenyan experiences. We curate bespoke safaris, 
                luxury stays, and seamless VIP transport across East Africa. 
                Discover the magic of Kenya in ultimate luxury.
              </p>
              
              <div className="social__links d-flex align-items-center gap-3 mt-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><i className="ri-instagram-fill"></i></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><i className="ri-facebook-fill"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><i className="ri-twitter-x-fill"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><i className="ri-youtube-fill"></i></a>
              </div>
            </div>
          </Col>

          {/* DISCOVER */}
          <Col lg="2" md="6" className="mb-4">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0 bg-transparent">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* QUICK LINKS */}
          <Col lg="2" md="6" className="mb-4">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0 bg-transparent">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* CONTACT */}
          <Col lg="4" md="6" className="mb-4">
            <h5 className="footer__link-title">Contact Us</h5>
            <ListGroup className="footer__quick-links">
              
              <ListGroupItem className="ps-0 border-0 bg-transparent d-flex align-items-start gap-3 mb-2">
                <span className="text-warning fs-5"><i className="ri-map-pin-line"></i></span>
                <div>
                  <h6 className="mb-0 text-white">Head Office:</h6>
                  <p className="mb-0 text-light" style={{ fontSize: "0.85rem" }}>Bazaar Plaza, Moi Avenue, Nairobi CBD, Kenya</p>
                </div>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 bg-transparent d-flex align-items-start gap-3 mb-2">
                <span className="text-warning fs-5"><i className="ri-mail-line"></i></span>
                <div>
                  <h6 className="mb-0 text-white">Email:</h6>
                  <p className="mb-0 text-light" style={{ fontSize: "0.85rem" }}>concierge@safariexplore.co.ke</p>
                </div>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 bg-transparent d-flex align-items-start gap-3">
                <span className="text-warning fs-5"><i className="ri-phone-line"></i></span>
                <div>
                  <h6 className="mb-0 text-white">Phone:</h6>
                  <p className="mb-0 text-light" style={{ fontSize: "0.85rem" }}>+254 700 123 456</p>
                </div>
              </ListGroupItem>

            </ListGroup>
          </Col>

          {/* COPYRIGHT */}
          <Col lg="12" className="text-center pt-5 mt-4 border-top border-secondary">
            <p className="copyright mb-0">
              &copy; {new Date().getFullYear()} Safari Explore Kenya. All rights reserved. 
              <br />
              <small className="text-muted">Designed for the ultimate Kenyan Super App experience.</small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
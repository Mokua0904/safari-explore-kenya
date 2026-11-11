import React from "react";
import "./Newsletter.css";
import { Container, Row, Col } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" className="mb-4 mb-lg-0">
            <div className="newsletter__content">
              <h5 className="text-warning text-uppercase fw-bold mb-2">Exclusive Access</h5>
              <h2>Join Our VIP Safari Community</h2>
              <div className="newsletter__input mt-4">
                <input type="email" placeholder="Enter your VIP email address" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                Subscribe to receive private access to Kenya's most exclusive lodges, 
                early booking discounts, and curated luxury travel guides.
              </p>
            </div>
          </Col>
          
          {/* We remove the old image and put a premium UI element or just keep it clean */}
          <Col lg="6" className="text-center d-none d-lg-block">
             <div className="newsletter__shape">
                 <i className="ri-flight-takeoff-line text-warning" style={{ fontSize: "10rem", opacity: 0.1 }}></i>
             </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
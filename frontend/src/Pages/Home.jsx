import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Components
import FeaturedTourList from "../Component/Featured-tours/FeaturedTourList";
import Subtitle from "../Shared/Subtitle";
import Searchbar from "../Shared/Searchbar";
import ServiceList from "../services/ServiceList";
import MasonryImageGallery from "../Component/image-gallery/MasonryImageGallery";
import Testimonial from "../Component/Testimonial/Testimonial";

import worldImg from "../assest/images/world.png";

const Home = () => {
  // Verified High-End Kenyan Images & Video
  const kenyaSafariImg = "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop"; 
  const kenyaBeachImg = "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1000&auto=format&fit=crop"; 
  
  // Reliable Pexels Safari video
  const safariVideo = "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4";

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section style={{ paddingBottom: "80px", paddingTop: "40px" }}>
        <Container>
          <Row>
            <Col lg="6">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <Subtitle Subtitle={"Experience The Extraordinary"} />
                  <img src={worldImg} alt="" className="ms-2" style={{ width: "40px" }} />
                </div>
                <h1 style={{ fontSize: "3.5rem", fontWeight: "800", lineHeight: "1.2", color: "#0f172a", marginTop: "20px" }}>
                  Discover the Magic of <span style={{ color: "#ffb703" }}>Kenya</span> in Ultimate Luxury
                </h1>
                <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8", marginTop: "20px" }}>
                  Welcome to Safari Explore Kenya. We curate bespoke, high-end travel 
                  experiences for discerning clients. From the private conservancies of the 
                  Maasai Mara to the secluded beaches of Diani, we provide seamless VIP 
                  transport and access to Kenya's most exclusive lodges.
                  <br /><br />
                  Every detail is tailored to perfection. Explore our exclusive 
                  itineraries, secure your booking, and let us handle the rest.
                </p>
                <div className="mt-4">
                  <Link to="/tours" className="btn btn-warning px-4 py-2 fw-bold text-dark shadow" style={{ borderRadius: "30px" }}>
                     Luxury Safaris
                  </Link>
                </div>
              </div>
            </Col>

            {/* COLUMN 1: SAFARI IMAGE (Links to Safaris) */}
            <Col lg="2">
              <Link to="/tours" style={{ textDecoration: "none" }}>
                <div style={{ width: "100%", height: "350px", borderRadius: "20px", overflow: "hidden", boxShadow: "0px 10px 30px rgba(0,0,0,0.15)", marginTop: "40px", cursor: "pointer" }}>
                  <img src={kenyaSafariImg} alt="Maasai Mara Safari" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </Link>
            </Col>

            {/* COLUMN 2: SAFARI VIDEO (Links to Safaris) */}
            <Col lg="2">
              <Link to="/tours" style={{ textDecoration: "none" }}>
                <div style={{ width: "100%", height: "350px", borderRadius: "20px", overflow: "hidden", boxShadow: "0px 10px 30px rgba(0,0,0,0.15)", marginTop: "60px", backgroundColor: "#000", cursor: "pointer" }}>
                  <video 
                    src={safariVideo} 
                    poster={kenyaSafariImg} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </Link>
            </Col>

            {/* COLUMN 3: BEACH IMAGE (Links to Luxury Stays) */}
            <Col lg="2">
              <Link to="/hotels" style={{ textDecoration: "none" }}>
                <div style={{ width: "100%", height: "350px", borderRadius: "20px", overflow: "hidden", boxShadow: "0px 10px 30px rgba(0,0,0,0.15)", marginTop: "40px", cursor: "pointer" }}>
                  <img src={kenyaBeachImg} alt="Diani Beach" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </Link>
            </Col>
            
            <Searchbar />
          </Row>
        </Container>
      </section>

      {/* ================= SUPER APP SERVICES ================= */}
      <section style={{ padding: "60px 0" }}>
        <Container>
          <Row className="mb-4">
            <Col lg="12" className="text-center">
              <h5 style={{ color: "#ffb703", fontWeight: "bold" }}>The Super App</h5>
              <h1 style={{ fontWeight: "bold", fontSize: "2.2rem", color: "#0f172a", lineHeight: "1.3" }}>Everything you need, in one place</h1>
            </Col>
          </Row>
          <Row>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ================= FEATURED TOURS ================= */}
      <section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle Subtitle={"Exclusive Access"} />
              <h2 style={{ fontWeight: "bold", fontSize: "2.2rem", color: "#0f172a" }}>Our Signature Kenyan Experiences</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      {/* ================= EXPERIENCE / WHY CHOOSE US ================= */}
      <section style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
        <Container>
          <Row className="align-items-center">
            {/* LEFT SIDE: TEXT & STATS */}
            <Col lg="6" className="mb-5 mb-lg-0 pe-lg-5">
              <div>
                <Subtitle Subtitle={"Why Choose Us"} />
                <h2 style={{ fontWeight: "800", fontSize: "2.5rem", color: "#0f172a", marginTop: "15px", lineHeight: "1.2" }}>
                  Unmatched expertise in <br />
                  East African luxury travel
                </h2>
                <p style={{ color: "#555", marginTop: "20px", fontSize: "1.05rem", lineHeight: "1.8" }}>
                  With over a decade of curating premium experiences, 
                  <b> Safari Explore Kenya</b> is the trusted partner for high-net-worth 
                  travelers seeking authenticity without compromising on comfort. 
                  <br /><br />
                  We provide private charters, dedicated travel concierges, and direct 
                  access to Kenya's most exclusive conservancies. Whether you require 
                  VIP transport from JKIA or a private helicopter to your lodge, 
                  our team ensures absolute perfection.
                </p>
              </div>
              
              {/* Counters */}
              <div className="d-flex align-items-center gap-4 mt-5 pt-3">
                <div>
                  <h3 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffb703", marginBottom: "0" }}>5k+</h3>
                  <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Elite Clients</p>
                </div>
                <div style={{ borderLeft: "2px solid #eee", height: "50px" }}></div>
                <div>
                  <h3 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffb703", marginBottom: "0" }}>50+</h3>
                  <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Luxury Lodges</p>
                </div>
                <div style={{ borderLeft: "2px solid #eee", height: "50px" }}></div>
                <div>
                  <h3 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffb703", marginBottom: "0" }}>10+</h3>
                  <p style={{ color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Years Experience</p>
                </div>
              </div>
            </Col>

           {/* RIGHT SIDE: PREMIUM KENYAN LODGE IMAGE */}
            <Col lg="6">
              <div style={{ 
                borderRadius: "20px", 
                overflow: "hidden", 
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                position: "relative"
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop" 
                  alt="Luxury Safari Lodge in Kenya" 
                  style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }} 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= GALLERY ================= */}
      <section style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle Subtitle={"Gallery"} />
              <h2 style={{ fontWeight: "bold", fontSize: "2.2rem", marginBottom: "30px", color: "#0f172a" }}>
                Glimpses of Kenyan Luxury
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImageGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section style={{ padding: "80px 0" }}>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle Subtitle={"Testimonials"} />
              <h2 style={{ fontWeight: "bold", fontSize: "2.2rem", marginBottom: "30px", color: "#0f172a" }}>
                What our high-end clients say
              </h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Subtitle from "../Shared/Subtitle";
import { BASE_URL } from "../utils/config";

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // 🆕 Search state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransports = async () => {
      setLoading(true);
      try {
        // We fetch ALL transports once. The filtering happens on the frontend below.
        // This makes searching instant without waiting for the backend to respond.
        const res = await fetch(`${BASE_URL}/transport`);
        const result = await res.json();
        if (result.success) {
          setTransports(result.data);
        }
      } catch (error) {
        console.error("Error fetching transport:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransports();
  }, []); // Note: We removed activeCategory from here, so it only fetches once.

  const handleBookTransport = (transport) => {
    navigate('/transport-booking', { state: { transport } });
  };

  const categories = ["All", "Cultural Nganya", "Safari 4x4", "Tour Van", "Executive Transfer", "Private Charter", "Luxury Coach"];

  // 🆕 FILTER LOGIC: Matches BOTH the Category buttons AND the Search Bar
  const filteredTransports = transports.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section style={{ padding: "130px 0 50px 0", backgroundColor: "#fcfbf9" }}>
        <Container>
          <div className="text-center mb-4">
            <Subtitle Subtitle={"VIP Mobility & Culture"} />
            <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#0f172a", marginTop: "10px" }}>
              Transport in Kenya
            </h1>
            <p style={{ color: "#b36a6a", maxWidth: "700px", margin: "0 auto" }}>
              From luxury helicopters to authentic Kenyan Nganyas, choose how you want to move.
            </p>
          </div>

          {/* 🆕 PREMIUM SEARCH BAR */}
          <div className="d-flex justify-content-center mt-5 mb-4">
            <div 
              className="search__bar shadow-sm rounded-pill d-flex align-items-center px-4 py-2 w-100" 
              style={{ maxWidth: "650px", backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
            >
              <i className="ri-search-line text-warning fs-5 me-3"></i>
              <input 
                type="text" 
                placeholder="Search by city, vehicle name, or features..." 
                className="search-input w-100"
                style={{ border: "none", outline: "none", fontSize: "1rem", background: "transparent" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Clear Search Button */}
              {searchQuery && (
                <i 
                  className="ri-close-circle-fill text-muted fs-5" 
                  style={{ cursor: "pointer" }}
                  onClick={() => setSearchQuery("")}
                ></i>
              )}
            </div>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="btn px-4 py-2 rounded-pill fw-bold"
                style={{
                  backgroundColor: activeCategory === cat ? "#ffb703" : "#ffffff",
                  color: activeCategory === cat ? "#0f172a" : "#555",
                  border: activeCategory === cat ? "2px solid #ffb703" : "2px solid #e2e8f0",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ paddingBottom: "80px" }}>
        <Container>
          {loading ? (
             <h4 className="text-center mt-5">Loading transport options...</h4>
          ) : (
            <Row>
              {/* 🆕 We map over filteredTransports instead of transports */}
              {filteredTransports.map((transport) => (
                <Col lg="4" md="6" sm="12" className="mb-4" key={transport._id}>
                  <div className="tour__card" style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "100%", backgroundColor: "white" }}>
                    <div className="tour__img" style={{ height: "220px", position: "relative" }}>
                      <img src={transport.photo} alt={transport.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "15px", right: "15px", backgroundColor: transport.category === "VIP Luxury" ? "#0f172a" : "#ffb703", color: transport.category === "VIP Luxury" ? "#ffb703" : "#0f172a", padding: "6px 12px", borderRadius: "5px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        {transport.category}
                      </span>
                    </div>
                    <div className="tour__content p-4 d-flex flex-column" style={{ height: "calc(100% - 220px)" }}>
                      <h5 className="text-dark fw-bold mb-1">{transport.title}</h5>
                      <p className="text-muted mb-2"><i className="ri-map-pin-line text-warning"></i> {transport.city}</p>
                      <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>{transport.desc.substring(0, 80)}...</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <div>
                          <span className="fw-bold text-dark fs-5">Ksh {transport.price.toLocaleString()}</span>
                          <br/>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>Capacity: {transport.capacity} pax</span>
                        </div>
                        <button onClick={() => handleBookTransport(transport)} className="btn btn-warning rounded-pill px-4 fw-bold">Book</button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
              
              {/* 🆕 Updated empty state for when search yields no results */}
              {filteredTransports.length === 0 && !loading && (
                <Col lg="12">
                  <div className="text-center mt-5">
                    <h4 className="text-muted mb-3">No transport found matching your search.</h4>
                    <button className="btn btn-outline-warning rounded-pill" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                      Clear Filters
                    </button>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Transport;
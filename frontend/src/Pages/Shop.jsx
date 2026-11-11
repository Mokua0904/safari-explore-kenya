import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Subtitle from "../Shared/Subtitle";
import { BASE_URL } from "../utils/config";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🆕 Search State
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const result = await res.json();
        if (result.success) {
          setProducts(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyProduct = (product) => {
    navigate('/product-checkout', { state: { product } });
  };

  // 🆕 FILTER LOGIC: Instantly filters products based on the search query
  const filteredProducts = products.filter((item) => {
    return (
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <section style={{ padding: "120px 0 60px 0", backgroundColor: "#fcfbf9" }}>
        <Container>
          <div className="text-center mb-5">
            <Subtitle Subtitle={"Authentic Kenyan Crafts"} />
            <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#0f172a", marginTop: "10px" }}>
              Souvenirs & Shop
            </h1>
            <p style={{ color: "#555", maxWidth: "700px", margin: "0 auto" }}>
              Take a piece of Kenya home with you. Shop authentic Maasai beadwork, handwoven bags, and premium Kenyan coffee.
            </p>
          </div>

          {/* 🆕 PREMIUM SEARCH BAR */}
          <div className="d-flex justify-content-center mb-4">
            <div 
              className="search__bar shadow-sm rounded-pill d-flex align-items-center px-4 py-2 w-100" 
              style={{ maxWidth: "650px", backgroundColor: "#fff", border: "1px solid #e2e8f0" }}
            >
              <i className="ri-search-line text-warning fs-5 me-3"></i>
              <input 
                type="text" 
                placeholder="Search for bags, beadwork, clothing..." 
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
        </Container>
      </section>

      <section style={{ paddingBottom: "80px" }}>
        <Container>
          {loading ? (
            <h4 className="text-center">Loading souvenirs...</h4>
          ) : (
            <Row>
              {/* 🆕 Map over filteredProducts instead of products */}
              {filteredProducts.map((product) => (
                <Col lg="3" md="6" sm="12" className="mb-4" key={product._id}>
                  <div className="tour__card" style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "100%", backgroundColor: "white" }}>
                    
                    <div className="tour__img" style={{ height: "220px", position: "relative" }}>
                      <img src={product.photo} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "15px", right: "15px", backgroundColor: "#0f172a", color: "#ffb703", padding: "6px 12px", borderRadius: "5px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        {product.category}
                      </span>
                    </div>

                    <div className="tour__content p-4 d-flex flex-column" style={{ height: "calc(100% - 220px)" }}>
                      <h5 className="text-dark fw-bold mb-2">{product.title}</h5>
                      <p className="text-muted mb-4" style={{ fontSize: "0.85rem" }}>{product.desc.substring(0, 70)}...</p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <div>
                          <span className="fw-bold text-dark fs-5">Ksh {product.price.toLocaleString()}</span>
                          <br/>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>{product.stock} in stock</span>
                        </div>
                        <button onClick={() => handleBuyProduct(product)} className="btn btn-warning rounded-pill px-4 fw-bold">
                          Buy
                        </button>
                      </div>
                    </div>

                  </div>
                </Col>
              ))}
              
              {/* 🆕 Updated Empty State */}
              {filteredProducts.length === 0 && !loading && (
                <Col lg="12">
                  <div className="text-center mt-5">
                    <h4 className="text-muted mb-3">No souvenirs found matching your search.</h4>
                    <button className="btn btn-outline-warning rounded-pill" onClick={() => setSearchQuery("")}>
                      Clear Search
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

export default Shop;
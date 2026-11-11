import React, { useEffect, useRef, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assest/images/logo.svg";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Safaris" },
  { path: "/hotels", display: "Luxury Stays" },
  { path: "/transport", display: "Transport" },
  { path: "/shop", display: "Souvenirs" },
  { path: "/about", display: "About" },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  
  // State to control mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setIsMobileMenuOpen(false);
    navigate("/home");
  };

  useEffect(() => {
    const onScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="header" ref={headerRef}>
      <Container fluid className="px-4 px-lg-5">
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between w-100">
            
            {/* LOGO */}
            <Link to="/home" className="logo d-flex align-items-center" onClick={closeMobileMenu}>
              <img
                src={Logo}
                alt="Safari Explore Kenya"
                style={{ height: "60px", width: "auto" }}
              />
            </Link>

            {/* DESKTOP NAVIGATION (Hidden on mobile) */}
            <div className="d-none d-lg-block">
              <ul className="menu d-flex align-items-center gap-4 mb-0">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? "active__link" : "")}
                      style={{ textDecoration: "none", fontWeight: "600", fontSize: "0.9rem" }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE (USER / BUTTONS) */}
            <div className="nav__right d-flex align-items-center gap-2">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="text-white text-lg-dark fw-bold text-decoration-none d-none d-sm-flex align-items-center gap-2"
                      style={{ fontSize: "0.9rem" }}
                      onClick={closeMobileMenu}
                    >
                      Hi, {user.username}
                    </Link>

                    <Button
                      className="btn btn-outline-light text-lg-dark rounded-pill px-3 py-1 d-none d-sm-block"
                      size="sm"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white text-lg-dark fw-bold text-decoration-none d-none d-sm-block"
                      style={{ fontSize: "0.9rem" }}
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-warning rounded-pill px-3 py-2 fw-bold text-dark shadow-sm"
                      style={{ fontSize: "0.9rem" }}
                      onClick={closeMobileMenu}
                    >
                      Book Now
                    </Link>
                  </>
                )}
              </div>

              {/* MOBILE MENU TOGGLE BUTTON */}
              <button 
                className="mobile__menu d-lg-none border-0 bg-transparent text-dark p-2"
                onClick={toggleMobileMenu} 
                style={{ fontSize: "1.8rem", cursor: "pointer", color: "#fff" }}
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </Row>
      </Container>

      {/* 📱 MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown d-lg-none">
          <ul className="mobile-menu-list text-center">
            {nav__links.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className="mobile-link"
                  onClick={closeMobileMenu}
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
            
            <hr className="my-3" style={{ borderColor: "#ddd" }} />

            {/* Mobile Auth Links */}
            {user ? (
               <>
                  <li>
                    <NavLink to="/account" className="mobile-link text-warning" onClick={closeMobileMenu}>
                      👤 My Account ({user.username})
                    </NavLink>
                  </li>
                  <li>
                     <button onClick={logout} className="btn btn-danger w-75 mt-3 rounded-pill">
                       Logout
                     </button>
                  </li>
               </>
            ) : (
               <>
                  <li>
                    <NavLink to="/login" className="mobile-link" onClick={closeMobileMenu}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                     <Link to="/register" className="btn btn-warning w-75 mt-3 rounded-pill fw-bold text-dark" onClick={closeMobileMenu}>
                       Register
                     </Link>
                  </li>
               </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
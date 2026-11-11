import React, { useRef, useState } from "react";
import "./Search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import LocationAutocomplete from "./LocationAutocomplete";

const Searchbar = () => {
  const guestsRef = useRef(2);
  const navigate = useNavigate();

  // States for autocomplete and dropdown
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("Safari");

  const experienceOptions = [
    { label: "Luxury Safari", value: "Safari" },
    { label: "Beach Resort", value: "Beach" },
    { label: "City Tour", value: "City" },
    { label: "Mountain Trek", value: "Mountain" },
  ];

  const searchHandler = async (e) => {
    e.preventDefault();
    const maxGroupSize = guestsRef.current.value;

    if (location === "" || maxGroupSize === "") {
      return alert("Please enter a destination and number of guests.");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${experience}&maxGroupSize=${maxGroupSize}`
      );
      if (!res.ok) return alert("No luxury packages found for this search.");
      const result = await res.json();
      navigate(
        `/tours/search?city=${location}&maxGroupSize=${maxGroupSize}`,
        { state: result.data }
      );
    } catch (err) {
      alert("Something went wrong with the search.");
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar shadow-lg rounded">
        <Form
          className="d-flex align-items-center gap-3 w-100"
          onSubmit={searchHandler}
        >
          {/* LOCATION AUTOCOMPLETE */}
          <FormGroup className="d-flex align-items-center gap-3 form__group form__group-fast m-0 flex-grow-1">
            <span className="search-icon-wrapper">
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="w-100">
              <h6 className="mb-0 text-muted" style={{ fontSize: "0.8rem", fontWeight: "600" }}>Destination</h6>
              <LocationAutocomplete 
                onSelect={setLocation} 
                placeholder="e.g. Maasai Mara..." 
              />
            </div>
          </FormGroup>

          <div className="divider"></div>

          {/* EXPERIENCE TYPE */}
          <FormGroup className="d-flex align-items-center gap-3 form__group form__group-fast m-0 flex-grow-1">
            <span className="search-icon-wrapper">
              <i className="ri-compass-3-line"></i>
            </span>
            <div style={{ width: "100%", position: "relative" }}>
              <h6 className="mb-0 text-muted" style={{ fontSize: "0.8rem", fontWeight: "600" }}>Experience</h6>
              <CustomSelect 
                options={experienceOptions}
                value={experience}
                onChange={setExperience}
                placeholder="Select..."
              />
            </div>
          </FormGroup>

          <div className="divider"></div>

          {/* GUESTS */}
          <FormGroup className="d-flex align-items-center gap-3 form__group form__group-last m-0 flex-grow-1">
            <span className="search-icon-wrapper">
              <i className="ri-group-line"></i>
            </span>
            <div className="w-100">
              <h6 className="mb-0 text-muted" style={{ fontSize: "0.8rem", fontWeight: "600" }}>Guests</h6>
              <input 
                type="number" 
                placeholder="2" 
                ref={guestsRef} 
                min="1" 
                required 
                className="search-input"
              />
            </div>
          </FormGroup>

          <button className="search-btn bg-warning" type="submit">
            <i className="ri-search-line text-dark"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default Searchbar;
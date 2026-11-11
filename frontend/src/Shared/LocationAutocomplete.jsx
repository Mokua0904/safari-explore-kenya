import React, { useState, useEffect, useRef } from "react";

const LocationAutocomplete = ({ onSelect, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Smart list of top Kenyan destinations (You can add more here)
  const popularDestinations = [
    "Maasai Mara National Reserve",
    "Diani Beach",
    "Nairobi",
    "Amboseli National Park",
    "Tsavo East National Park",
    "Tsavo West National Park",
    "Lamu Island",
    "Lake Naivasha",
    "Lake Nakuru",
    "Lewa Conservancy",
    "Samburu National Reserve",
    "Mount Kenya",
    "Watamu",
    "Malindi",
    "Hell's Gate National Park",
  ];

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSelect(value); // Pass the text back to the main Searchbar state

    if (value.length > 0) {
      // Filter destinations that start with the typed letters
      const filtered = popularDestinations.filter((dest) =>
        dest.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (destination) => {
    setQuery(destination);
    onSelect(destination);
    setIsOpen(false);
  };

  return (
    <div className="location-autocomplete-container" ref={wrapperRef}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          if (query.length > 0) setIsOpen(true);
        }}
        required
      />
      
      {isOpen && suggestions.length > 0 && (
        <ul className="location-suggestions-list">
          {suggestions.map((dest, index) => (
            <li key={index} onClick={() => handleSelect(dest)}>
              <i className="ri-map-pin-2-line me-2 text-warning"></i> {dest}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
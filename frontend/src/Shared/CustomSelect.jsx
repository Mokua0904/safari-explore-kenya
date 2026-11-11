import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the label to display for the current value
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className="custom-select-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      
      {isOpen && (
        <ul className="custom-select-list">
          {options.map((option) => (
            <li 
              key={option.value} 
              className={`custom-select-item ${value === option.value ? "active" : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
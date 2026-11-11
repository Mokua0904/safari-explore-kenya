import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

// Image Imports
import weatherImg from "../assest/images/weather.png";
import guideImg from "../assest/images/guide.png";
import customizationImg from "../assest/images/customization.png";
import worldImg from "../assest/images/world.png"; 

const servicesData = [
  {
    imgUrl: guideImg, 
    title: "Luxury Safaris",
    desc: "Private game drives in the Maasai Mara and exclusive-use conservancies.",
  },
  {
    imgUrl: customizationImg, 
    title: "Premium Stays",
    desc: "Book high-end luxury lodges, boutique resorts, and 5-star coastal retreats.",
  },
  {
    imgUrl: weatherImg, 
    title: "VIP Transport",
    desc: "Seamless private charters, SGR first-class tickets, and JKIA pickups.",
  },
  {
    imgUrl: worldImg, 
    title: "Souvenirs & Shop",
    desc: "Purchase authentic Kenyan crafts, Maasai shukas, and premium coffee.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
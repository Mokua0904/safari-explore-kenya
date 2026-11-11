import React from "react";
import Slider from "react-slick";
import ava01 from "../../assest/images/ava-1.jpg";
import ava02 from "../../assest/images/ava-2.jpg";
import ava03 from "../../assest/images/ava-3.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 4000, // Slowed down so clients can actually read it
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          "Booking our honeymoon through Safari Explore Kenya was the best decision we made. 
          The private game drives in the Maasai Mara were magical, and our VIP pickup from JKIA 
          was seamless. Truly a 5-star experience from start to finish. The Super App made 
          tracking our itinerary so easy!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="Client" />
          <div>
            <h5 className="mb-0 mt-3">Sarah Jenkins</h5>
            <p>UK Tourist - Luxury Safari</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "I used the Super App to book a last-minute SGR first-class ticket to Mombasa 
          and a premium stay in Diani. Everything was handled perfectly in one place. 
          The M-Pesa checkout was incredibly fast and secure. I highly recommend this to 
          any local looking for a seamless weekend getaway."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="Client" />
          <div>
            <h5 className="mb-0 mt-3">David Ochieng</h5>
            <p>Nairobi Resident - VIP Transport & Stay</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "As a travel photographer, I've used many platforms, but the attention to detail 
          here is unmatched. The exclusive access to the conservancies and the hot air 
          balloon safari were absolute highlights of my trip to Kenya. I even bought authentic 
          Maasai crafts from the Souvenirs shop!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="Client" />
          <div>
            <h5 className="mb-0 mt-3">Elena Rossi</h5>
            <p>Travel Photographer - Luxury Safari</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
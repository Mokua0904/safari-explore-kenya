import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// High-End Kenyan Images from Unsplash
const images = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop", // Elephants in Amboseli
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop", // Maasai Mara Sunset
  "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop", // Diani Beach
  "https://images.unsplash.com/photo-1542314831-c6a4d1424b94?q=80&w=800&auto=format&fit=crop", // Luxury Safari Lodge
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop", // Paris - replace with Kenyan monument if preferred
  "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?q=80&w=800&auto=format&fit=crop", // Giraffe Manor Nairobi
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop", // Mt Kenya
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop", // Safari vehicle
];

const MasonryImageGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="20px">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
            alt="Kenyan Luxury Experience"
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImageGallery;
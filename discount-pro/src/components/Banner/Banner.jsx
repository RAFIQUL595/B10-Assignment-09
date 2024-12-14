import React from "react";
import "react-slideshow-image/dist/styles.css";
import firstImg from "../../assets/man's jacket.jpg";
import scendImg from "../../assets/woman's jacket.jpg";
import thirdImg from "../../assets/Apple iPhone 16 Pro Max.png";
import fourthImg from "../../assets/camera.jpg.png";
import fiveImg from "../../assets/laptop.jpg";

import { Slide } from "react-slideshow-image";

const Banner = () => {
  // Slider images add
  const images = [
    { src: firstImg, alt: "Men's jacket" },
    { src: scendImg, alt: "Woman's jacket" },
    { src: thirdImg, alt: "Apple iPhone 16 Pro Max" },
    { src: fourthImg, alt: "Camera product" },
    { src: fiveImg, alt: "Gaming Laptop" },
  ];

  return (
    <div className="my-10 border rounded-xl shadow-md p-5">
      {/* Slider with some images */}
      <Slide>
        {images.map((image, index) => (
          <div
            className="flex justify-center items-center h-[400px]"
            key={index}
          >
            <img className="h-96 w-[500px]" src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const dummyImg = [
  {
    image:
      "https://cookpad.com/id/resep/3652466-stik-keju-renyah",
    label: "ngunyah terus!",
  },
  {
    image:
      "",
    label: "Our Products are 100% Organic, Pesticide-free!",
  },
  {
    image:
      "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    label: "Not only that it's more healthy, but it's also more delicious!",
  },
];

const CarouselComponent = () => {
  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        {dummyImg.map((img,index) => {
          return (
            <div key={index}>
              <img className="object-cover" alt="" src={img.image} style={{ maxHeight: "80vh" }}></img>
              <p
                className="legend"
                style={{
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.81)",
                  color: "rgba(11, 133, 25, 0.86)",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderRadius: "0.375rem",
                }}
              >
                {img.label}
              </p>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselComponent;

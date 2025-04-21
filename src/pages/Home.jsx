import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import BlogGrid from "../components/Cards";
import BlogList from "../components/data";

const carouselImages = [
  "/images/church1.jpg",
  "/images/church2.jpg",
  "/images/church3.jpg"
];



const Home = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <main>
    
    <Box sx={{ minHeight: "100vh", position: "relative",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            color: "white",
            py: 4,
          }}>
      {/* Carousel */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Slider {...carouselSettings}>
          {carouselImages.map((img, index) => (
            <Box
              key={index}
              sx={{
                height: "70vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                Welcome to GCOP
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Blog Cards */}
      <BlogGrid blogCards={BlogList}></BlogGrid>
    </Box>
    
    </main>
  );
};

export default Home;

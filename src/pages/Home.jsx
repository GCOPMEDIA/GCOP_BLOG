import React,{useState,useEffect} from "react";
import axios from "axios";
import { Box, Typography,Container } from "@mui/material";
import BlogGrid,{Slide} from "../components/Cards";
import BlogList from "../components/data";
import Background from "../components/Background";
import Carousel from "../components/Carousel";
import Slider from "react-slick";







const Home = () => {
 
    

  return (
    <main>
    
    {/* <Box sx={{ minHeight: "100vh", position: "relative",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            color: "white",
            py: 4,
          }}> */}
      {/* Carousel */}
      <Background children=
      <Container>
      <Slide />
      {/* <Box sx={{ position: "relative", overflow: "hidden" }}>
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
      </Box> */}

      {/* Blog Cards */}
      <BlogGrid blogCards={BlogList}></BlogGrid>
      </Container>
      />
    {/* </Box> */}
    
    </main>
  );
};

export default Home;

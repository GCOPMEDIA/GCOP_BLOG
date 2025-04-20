import React from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, Typography, CardActionArea } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogGrid from "../components/Cards";

const carouselImages = [
  "/images/church1.jpg",
  "/images/church2.jpg",
  "/images/church3.jpg"
];

const blogCards = [
  { id: 1,title: "Faith in Action", subtitle: "A powerful message of hope", url: "/article/1", media: "/images/sermon.jpg",
    like_count: 5 },
  { id: 2,title: "Youth Night Recap", subtitle: "Our vibrant youth in worship", url: "/article/2", media: "/images/youth.jpg",
    like_count: 4 },
  { id: 3,title: "Outreach Mission", subtitle: "Touching lives in our city", url: "/article/3", media: "/images/outreach.jpg" ,
    like_count: 45},
  {
    id: 4,
    title: "Blog Title",
    subtitle: "Optional subtitle",
    media: "https://your.image.url",
    video_url: "IkoIKcuq3ic", // if there's a video
    url: "/article/12" // where to navigate
    ,
    like_count: 5
  }
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
      <BlogGrid blogCards={blogCards}></BlogGrid>
    </Box>
    
    </main>
  );
};

export default Home;

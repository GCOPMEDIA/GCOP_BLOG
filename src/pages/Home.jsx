import React,{useState,useEffect} from "react";
import axios from "axios";
import { Box, Typography,Container } from "@mui/material";
import BlogGrid from "../components/Cards";
import BlogList from "../components/data";
import Background from "../components/Background";
import Carousel from "../components/Carousel";
import Slider from "react-slick";






const Home = () => {
  const fallbackImages = [
      { title: "Welcome to Church", url: "/images/church1.jpg" },
      { title: "Join Our Services", url: "/images/church2.jpg" },
      { title: "Be Part of Our Community", url: "/images/church3.jpg" }
    ];
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("http://print-gurus.onrender.com/events/")
          .then((response) => {
            const fetchedItems = response.data.data;
            if (fetchedItems.length === 0) {
              setItems(fallbackImages);
            } else {
              setItems(fetchedItems);
            }
          })
          .catch((error) => {
            console.error("Error fetching events:", error);
            setItems(fallbackImages);
          });
      }, []);
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
      <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Slider {...carouselSettings}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: "70vh",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: item.url.endsWith(".mp4")
                ? "black"
                : `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.url}) center/cover no-repeat`
            }}
          >
            {item.url.endsWith(".mp4") ? (
              <video
                src={item.url}
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
            <Typography
              variant="h3"
              sx={{
                position: "absolute",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                px: 2
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
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

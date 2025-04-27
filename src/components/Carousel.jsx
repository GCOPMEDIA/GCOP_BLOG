import React, {useState,useEffect} from "react";
import { Box ,Typography} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";

function Carousel(){
    const [items, setItems] = useState([]);
    const carouselImages = [
        "/images/church1.jpg",
        "/images/church2.jpg",
        "/images/church3.jpg"
      ];
    useEffect(() => {
        axios.get("http://print-gurus.onrender.com/events/")
          .then((response) => {
            setItems(response.data);
            
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
            setItems(carouselImages)
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
    return(
    <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Slider {...carouselSettings}>
          {carouselImages.map((img, index) => (
            <Box
              key={index}
              sx={{
                height: "70vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                {img.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>)
}

export default Carousel;
import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
  darken
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const BlogGrid = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/all-posts/')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }, []);
  const [openModal, setOpenModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const [likes, setLikes] = useState(0);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };


  const handleShare = (url) => {
    setShareUrl(window.location.origin + url);
    setOpenModal(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr"
          },
          gap: 3,
          p: 4,
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        }}
      >
        {posts.map((card, idx) => (
          <Card
            key={idx}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              height: 340,
              position: "relative",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)"
              }
            }}
          >
            <CardActionArea href={card.url} sx={{ height: "100%" }}>
              {card.video_url ? (
                <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${card.video_url}?autoplay=0&mute=1&controls=0&loop=1&playlist=${card.video_url}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      objectFit: "cover"
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      p: 2
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${card.media})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 2
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                </Box>
              )}
            </CardActionArea>

            {/* Like & Share */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                display: "flex",
                gap: 1,
                zIndex: 2
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleLike(card.id);
                }}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)"
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                {card.like_count }
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleShare(card.url);
                }}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)"
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Share Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="share-modal-title"
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
            mx: "auto",
            mt: "20vh",
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <Typography id="share-modal-title" variant="h6">
            Share This Blog
          </Typography>
          <TextField
            value={shareUrl}
            fullWidth
            variant="outlined"
            disabled
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy Link
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BlogGrid;
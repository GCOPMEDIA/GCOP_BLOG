import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
 
  CardMedia,
  Container,
  Divider,
} from "@mui/material";

const LeaderCard = ({ leader }) => (
  <Card sx={{ display: "flex", mb: 3, backgroundColor: "#222", color: "white" }}>
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2 }}>
      <Typography variant="h6">{leader.leader_title}</Typography>
      <Typography variant="h5" fontWeight="bold">{leader.leader_name}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>{leader.leader_branch}</Typography>
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 200, borderRadius: "0 20px 20px 0" }}
      image={leader.leader_image}
      alt={leader.leader_name}
    />
  </Card>
);

const AboutUs = () => {
  const [mockLeaders, setMockLeaders] = useState({
    first_leader: null,
    clergy: [],
    elder: [],
    deacons: [],
    worker: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(" https://print-gurus.onrender.com/about/")
      .then((response) => {
        setMockLeaders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const { first_leader, clergy, elder, deacons, workers } = mockLeaders;
  console.log(mockLeaders);

  if (loading) {
    return (
      <Box py={10} textAlign="center">
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <main>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "white",
          py: 4,
        }}
      >
        <Container>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            About Us
          </Typography>

          {first_leader && (
            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold">{first_leader.leader_title}</Typography>
                <Typography variant="h6" mt={1}>{first_leader.leader_name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={first_leader.leader_image}
                  alt={first_leader.leader_name}
                  sx={{ borderRadius: 2, boxShadow: 3 }}
                />
              </Grid>
            </Grid>
          )}

          <Box mb={4}>
            <Typography variant="h4" gutterBottom>Leaders</Typography>
            <Typography variant="body1">
              At <strong>GCOP</strong>, our mission is to provide a <em>faith-centered, community-driven, and spiritually enriching</em> experience...
            </Typography>
          </Box>

          {[
            { title: "Clergy", data: clergy },
            { title: "Elders", data: elder },
            { title: "Deacons", data: deacons },
            { title: "Workers", data: workers },
          ].map((group) => (
            <Box key={group.title} mb={6}>
              <Typography variant="h5" gutterBottom>{group.title}</Typography>
              <Grid container spacing={2}>
                {group.data?.length > 0 ? (
                  group.data.map((leader, i) => (
                    <Grid item xs={12} md={6} key={i}>
                      <LeaderCard leader={leader} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ ml: 2 }}>No {group.title.toLowerCase()} available.</Typography>
                )}
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>
    </main>
  );
};

export default AboutUs;

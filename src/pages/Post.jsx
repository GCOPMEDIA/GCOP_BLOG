import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogCards from '../components/data';
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Comment from '../components/Comment';


const Article = () => {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(0);
    useEffect(() => {
      axios.get('https://print-gurus.onrender.com/all-posts/')
        .then(response => {
          setPosts(response.data);
          
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }, []);
    useEffect(() => {
        axios.get('https://print-gurus.onrender.com/csrf/')
          .then(res => {
            axios.defaults.headers.post['X-CSRFToken'] = res.data.csrfToken;
          });
      }, []);
      

    const { id } = useParams();
    const post = posts.find((p) => p.id.toString() === id);
    useEffect(() => {
        if (post) {
          setLikes(post.like_count);
        }
      }, [post]);
 
  const [snack, setSnack] = useState({ open: false, message: '' });
  
  

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleLike = () => {
    axios.post(`https://print-gurus.onrender.com/like-post/${post.id}/`)
      .then(res => {
        setLikes(res.data.likes);
      })
      .catch(err => {
        console.error("Failed to like:", err);
      });
  };
  

  const handleShare = async () => {
    const fullUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.blog_title, url: fullUrl });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullUrl);
        setSnack({ open: true, message: 'Link copied to clipboard!' });
      } catch (err) {
        console.error(err);
        setSnack({ open: true, message: 'Failed to copy link' });
      }
    } else {
      setSnack({ open: true, message: 'Sharing not supported on this browser' });
    }
  };
  if (!post) {
    return <Typography variant="h6" sx={{ p: 4 }}>Article not found</Typography>;
  }
  return (
    <main>

    <Box sx={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                color: "white",
                py: 3,}}>
      {/* Video or Image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        {post.video_url ? (
          <iframe
            src={`https://www.youtube.com/embed/${post.video_url}`}
            title="video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '90%',
              aspectRatio: '16/9',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          />
        ) : (
          <img
            src={post.media}
            alt="Blog Banner"
            style={{
              width: '90%',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>

      {/* Title & Subtitle */}
      <Box textAlign="center" mb={2}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 2,
            borderBottom: '3px solid #007BFF',
            pb: 1,
            display: 'inline-block',
            mb: 1,
          }}
        >
          {post.title}
        </Typography>

        <Typography variant="h6" color="#007BFF" sx={{ fontWeight: 'bold' }}>
          {post.subtitle}
        </Typography>
      </Box>

      {/* Body */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderLeft: '4px solid #007BFF',
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          fontSize: 18,
          lineHeight: 1.6,
          textAlign: isMdUp ? 'justify' : 'left',
        }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* Like / Share / Comment */}
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <IconButton onClick={handleLike} sx={{ color: 'white' }}>
          <FavoriteIcon />
          <Typography variant="body2" ml={1}>{likes}</Typography>
          </IconButton>

        <IconButton onClick={handleShare} sx={{ color: 'white' }}>
          <ShareIcon />
          <Typography variant="body2" ml={1}>Share</Typography>
        </IconButton>
      </Box>
      {/* Comments Section */}
<Box mt={5} p={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
  <Typography variant="h6" gutterBottom>
    Comments
  </Typography>

  <Comment postId={post.id} />
</Box>


      <Box mt={2} textAlign="center" fontStyle="italic" color="gray">
        Article by {post.created_by}
      </Box>

      {/* Snackbar for Share */}
      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ open: false, message: '' })}
        message={snack.message}
        autoHideDuration={3000}
      />
    </Box>

    </main>
  );
};

export default Article;

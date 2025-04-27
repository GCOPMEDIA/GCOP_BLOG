import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Collapse,
  IconButton,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import {Link} from "react-router-dom"
import {getToken} from '../utils/auth';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar  from '../components/UserAvatar';

const CommentItem = ({ comment, postId, refresh }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [change,setChange] = useState(false)
  const getToken = localStorage.getItem('token')
  const isAuthenticated = localStorage.getItem('isAuthenticated') 
  const username = localStorage.getItem('username')

  

  const handleChange = () => {
    setChange(!change)}

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      await axios.post(`https://print-gurus.onrender.com/reply/`, {
        text: replyText,
        parent: comment.id,
        username:username
      });
      setReplyText('');
      setShowReply(false);
      refresh(); // Refetch comments
    } catch (err) {
      console.error('Reply failed:', err);
    }
  };

  return (
    <Box ml={comment.parent ? 4 : 0} mb={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <UserAvatar username={comment.username} /> {/* Assuming you have a UserAvatar component */}
        <Box>
          <Typography fontWeight="bold" color="white">{comment.username}</Typography>
          <Typography color="white">{comment.comment}</Typography>
        </Box>
      </Box>
      {comment.type === "comment" &&(
      <Box mt={1} ml={6}>
        <IconButton size="small" onClick={() => setShowReply(!showReply)}>
          <ReplyIcon fontSize="small" sx={{ color: 'gray' }} />
        </IconButton>

        <Collapse in={showReply}>
        <Box display="flex" gap={1} mt={1}>
  <TextField
    multiline
    minRows={2}
    value={replyText}
    onChange={(e) => setReplyText(e.target.value)}
    placeholder="Write a reply..."
    sx={{
      width: '400px',
      backgroundColor: 'rgba(123, 123, 123, 0.5)',
      border: '1.5px solid rgba(73, 12, 85, 1)',
      borderRadius: 3,
    }}
  />
  
  <AnimatePresence>
    {replyText.trim() && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={handleReply} 
          variant="contained"
          sx={{
            textTransform: 'none',
            background: 'linear-gradient(45deg, #6A1B9A, #8E24AA)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            '&:hover': {
              background: 'linear-gradient(45deg, #8E24AA, #6A1B9A)',
            },
          }}
        >
          Reply
        </Button>
      </motion.div>
    )}
  </AnimatePresence>
</Box>

        </Collapse>
      </Box>)}
    </Box>
  );
};



const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [mainText, setMainText] = useState('');
  const token = getToken();
  const isAuthenticated = !!token;

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://print-gurus.onrender.com/all-comments/?post_id=${postId}`);
      setComments(res.data.comments); // Make sure to access the 'comments' key
    } catch (err) {
      console.error('Failed to fetch comments:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handlePost = async () => {
    if (!mainText.trim()) return;

    const username = localStorage.getItem('username');
    if (!username) {
      console.error('No username found in localStorage');
      return;
    }

    try {
      await axios.post('https://print-gurus.onrender.com/comment/', {
        username: username,
        post_id: postId,
        comment: mainText
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Comment posted successfully');
      fetchComments(); // Refresh comments after posting
    } catch (err) {
      console.error('Post failed:', err.response?.data || err.message);
    }

    setMainText('');
  };

  return (
    <Box>
      {/* Comment Form */}
      <Box mb={3} display="flex" gap={1}>
        <TextField
          multiline
          minRows={2}
          placeholder="Add a comment..."
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
          sx={{
            width: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '1.5px solid rgba(73, 12, 85, 1)',
            borderRadius: 3,
          }}
        />

        {isAuthenticated ? (
          <Button 
            onClick={handlePost} 
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: 'rgba(73, 12, 85, 0.8)',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(98, 15, 115, 1)',
                borderColor: 'white',
              },
              textAlign: "center",
              fontSize: "medium",
              fontWeight: "bold",
            }}
          >
            Post
          </Button>
        ) : (
          <Button 
            component={Link} 
            to="/login"
            variant="outlined"
            sx={{
              textTransform: 'none',
              backgroundColor: 'rgba(73, 12, 85, 0.8)',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(98, 15, 115, 1)',
                borderColor: 'white',
              },
              textAlign: "center",
              fontSize: "medium",
              fontWeight: "bold",
            }}
          >
            Sign In to Comment
          </Button>
        )}
      </Box>

      {/* Render Comments */}
      {comments.length > 0 ? 
        (comments.map((comment, index) => (
  <Box key={index}>
    <CommentItem comment={comment} postId={postId} refresh={fetchComments} />
    
    {/* Render replies */}
    {comment.replies?.map((reply, replyIndex) => (
      <Box key={replyIndex} ml={6}>
        <CommentItem comment={reply} postId={postId} refresh={fetchComments} />
      </Box>
    ))}
  </Box>
)))
 : (
        <p>No comments yet. Be the first to comment</p>
      )}
    </Box>
  );
};

export default Comment;



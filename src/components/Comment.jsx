import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  Collapse,
  IconButton,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

const CommentItem = ({ comment, postId, refresh }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      await axios.post(`https://print-gurus.onrender.com/comments/${postId}/`, {
        text: replyText,
        parent: comment.id,
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
        <Avatar src={comment.author_avatar} alt={comment.author_name} />
        <Box>
          <Typography fontWeight="bold" color="white">{comment.author_name}</Typography>
          <Typography color="white">{comment.text}</Typography>
        </Box>
      </Box>

      <Box mt={1} ml={6}>
        <IconButton size="small" onClick={() => setShowReply(!showReply)}>
          <ReplyIcon fontSize="small" sx={{ color: 'gray' }} />
        </IconButton>

        <Collapse in={showReply}>
          <Box display="flex" gap={1} mt={1}>
            <TextField
              fullWidth
              size="small"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <Button onClick={handleReply} variant="contained">Reply</Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [mainText, setMainText] = useState('');

  const fetchComments = () => {
    axios.get(`https://print-gurus.onrender.com/comments/${postId}/`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handlePost = async () => {
    if (!mainText.trim()) return;

    try {
      await axios.post(`https://print-gurus.onrender.com/comments/${postId}/`, {
        text: mainText,
        parent: null,
      });
      setMainText('');
      fetchComments();
    } catch (err) {
      console.error('Post failed:', err);
    }
  };

  return (
    <Box>
      {/* Comment Form */}
      <Box mb={3} display="flex" gap={1}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Add a comment..."
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button onClick={handlePost} variant="contained">Post</Button>
      </Box>

      {/* Render Comments */}
      {comments
        .filter(comment => comment.parent === null)
        .map((comment) => (
          <Box key={comment.id}>
            <CommentItem
              comment={comment}
              postId={postId}
              refresh={fetchComments}
            />
            {comments
              .filter(reply => reply.parent === comment.id)
              .map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  refresh={fetchComments}
                />
              ))}
          </Box>
        ))}
    </Box>
  );
};

export default Comment;

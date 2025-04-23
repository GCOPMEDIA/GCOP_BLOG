import React from "react";
import {

    Typography,
    IconButton
  } from '@mui/material';
  import CommentIcon from '@mui/icons-material/Comment';

const Comment = () => {
  return (
    <IconButton sx={{ color: 'white' }}>
          <CommentIcon />
          <Typography variant="body2" ml={1}>Comments</Typography>
    </IconButton>
  );
}

export default Comment;
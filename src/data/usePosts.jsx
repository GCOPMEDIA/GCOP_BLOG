import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogGrid = () => {useEffect(() => {
    axios.get(' https://print-gurus.onrender.com/all-posts/')
      .then(response => {
        return response.data;
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
  }, []);}

  export default BlogGrid;
import axios from "axios";
import React, { useEffect,useState } from "react";

const BlogList = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      axios.get('https://print-gurus-jmfg.onrender.com/all-posts/')
        .then(response => {
            
          setPosts(response);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }, []);
return posts}


//     { id: 1,title: "Faith in Action", subtitle: "A powerful message of hope", url: "/article/1", media: "/images/sermon.jpg",
//       like_count: 5 },
//     { id: 2,title: "Youth Night Recap", subtitle: "Our vibrant youth in worship", url: "/article/2", media: "/images/youth.jpg",
//       like_count: 4 },
//     { id: 3,title: "Outreach Mission", subtitle: "Touching lives in our city", url: "/article/3", media: "/images/outreach.jpg" ,
//       like_count: 45},
//     {
//       id: 4,
//       title: "Blog Title",
//       subtitle: "Optional subtitle",
//       media: "https://your.image.url",
//       video_url: "IkoIKcuq3ic", // if there's a video
//       url: "/article/4" // where to navigate
//       ,
//       like_count: 5
//     }
//   ];
// 

  export default BlogList
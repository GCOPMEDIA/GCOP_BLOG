import React from 'react';
import AboutUs from './pages/About';
import Home from './pages/Home';
import Article from './pages/Post';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const sampleEvents = [
  { event_image: '/images/event1.jpg' },
  { event_video: '/videos/event2.mp4' },
];

const sampleBlogs = [
  {
    blog_title: 'Welcome to GCOP',
    blog_subtitle: 'Faith and Community',
    blog_media: '/images/blog1.jpg',
    like_count: 10,
  },
  {
    blog_title: 'Weekly Reflections',
    video_url: 'dQw4w9WgXcQ',
    like_count: 25,
  },
];



const App = () => {
  return (
    <Router>
      <main className="relative min-h-screen text-white overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-80" />
        </div>

        {/* Content on top of background */}
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </Router>
  );
};

export default App;

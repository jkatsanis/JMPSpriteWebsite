import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopBar from './components/topbar/topbar';
import Home from './components/home/home';
import Info from './components/info';

const App: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#1E1E1E');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const colorIndex = Math.floor(scrollPosition / 10); // 160 is approximately 10rem in pixels

      // Define your color palette here
      const colors = ['#1E1E1E', '#2C3E50', '#34495E', '#16A085', '#27AE60'];

      // Set background color based on colorIndex
      setBgColor(colors[colorIndex]);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    
    </BrowserRouter>
  );
};

export default App;

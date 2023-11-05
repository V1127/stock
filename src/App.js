import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup"; 
import Login from "./components/Login";
import Home from "./components/home/home";

import Track from "./components/track/track";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
	    <Route path="/home" element={<Home />} />
    
      <Route path="/track" element={<Track />} />

    </Routes>
  );
}

export default App;

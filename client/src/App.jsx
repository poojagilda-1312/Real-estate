import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import Profile from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sing-up" element={<SignUp/>}></Route>
        <Route path="/about" element={<About/>}></Route>

        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

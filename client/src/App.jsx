import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import Profile from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Header}  from "./components/Header";
import { PrivateRoute } from "./components/PrivateRoute";
import { CreateList } from "./pages/CreateList";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/about" element={<About/>}></Route>
<Route element={<PrivateRoute/>}>
<Route path="/profile" element={<Profile/>}></Route> 
<Route path="/create-list" element={<CreateList/>}></Route>
</Route>
    
      </Routes>
    </BrowserRouter>
  );
}

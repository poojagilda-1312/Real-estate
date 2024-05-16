import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userslice";
import { OAuth } from "../components/OAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SignIn = () => {
  const [formData, setFormData] = useState({});
const {loading,error}= useSelector((state)=>state.user) 
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const notify = () => toast("User is successfully Login!");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("https://real-estate-4rd4.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
      dispatch(signInFailure(data.messsage))

        return;
      }
    dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
    dispatch(signInFailure(error.messsage))
    }

    // console.log(data);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>

        <button onClick={notify}
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity:90"
        >
          {loading ? "Loading... " : "Sign In"}
        </button>
        <ToastContainer />
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 mt-5">
        <p>dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

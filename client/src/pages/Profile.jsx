import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
} from "../redux/user/userslice";
import { useDispatch } from "react-redux";
import React from "react";
import { FaPhoenixFramework } from "react-icons/fa";


const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState();

  console.log(currentUser);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState();
  console.log(file + "fikl is here");
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("upload is" + progress + "% done ");
      setFilePerc(Math.round(progress));
    });
    (error) => {
      setFileUploadError(true);
    };
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    };
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log("here is the eroor");
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // const handleSignOut = async () => { 
  //      try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch('/api/auth/signOut');
  //     const data = await res.json();

  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }

  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(data));
  //   }
  // };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signOut');
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message)); // Change this line
        return;
      }
  
      dispatch(signOutUserSuccess(data));
      // navigate('/signin')
      // Assuming you have a signOutUserSuccess action
    } catch (error) {
      dispatch(signOutUserFailure(error.message)); // Change this line
    }
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        ></input>
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover  cursor-pointer self-center mt-2"
        ></img>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity"
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5"> </p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated Success" : ""}
      </p>
    </div>
  );
};
export default Profile;

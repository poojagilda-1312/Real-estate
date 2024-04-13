import React from 'react'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  return (
  <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
    <form className='flex flex-col gap-4 '>
      <input type ='text' placeholder='username' id='username' className='border p-3 rounded-lg'></input>
      <input type ='email' placeholder='email' id='email' className='border p-3 rounded-lg'></input>
      <input type ='password' placeholder='password' id='password' className='border p-3 rounded-lg'></input>
   
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity:90'>sign up</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
    </div>
    </div>
  )
}

import React from 'react'
import { useState } from 'react';

import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail,  } from 'firebase/auth';
export default function ForgotPassword() {
  
  const [email, setEmail] = useState("")
  
  function onChange(e){
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email has been sent");
      
    } catch (error) {
      toast.error("Could send reset password")
    }
  }
  return (
    <div className='w-full h-screen bg-[#32383D]'>

    <section className=''> 
    
      <h5 className='text-3xl p-4 text-center text-bold'> <span>Forgot Password</span></h5>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src = "https://img.freepik.com/premium-photo/disappointed-person-showing-thumbs-down-symbol-studio-doing-negative-failure-disagree-gesture-with-hands-displeased-man-advertising-disapproval-fail-rejection-sign_482257-42053.jpg" alt="key" className='w-full rounded-2xl'/>

        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          
            <input  type='text' id= "email" value={email} onChange={onChange} placeholder='Email Address' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6'/>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6'> Don't have a account?
              <Link to= "/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to = "/sign-in" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'>Sign in instead</Link>
              </p>
            </div>
            <button className= "w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type = "submit">SEND PASSWORD RESET</button>
          <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray after:border-t after:flex-1  after:border-gray-300' >
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth/>
          </form>
          
        </div>
      </div>
    </section>
    </div>
  )
}

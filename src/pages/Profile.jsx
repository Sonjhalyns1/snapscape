import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {FcLandscape} from "react-icons/fc"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const[changeDetail, setChangeDetail] = useState(false)
  const[loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const {name , email} = formData;
  function onLogout(){
    auth.signOut()
    navigate("/")
  }
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onsubmit(){
    try{
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{displayName: name,})

        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
        toast.success("Your profile name has been changed")
      }

    } catch (error){
      toast.error("Could not update the profile detail")
    }
  }
  return (
    <div className='h-screen w-full bg-[#32383D]'>
    <section className='p-5 max-w-6xl mx-auto flex justify-center items-center flex-col '>
      <h6 className='text-6xl text-center font-bold'>My Profile</h6>
      <div className='w-full md:w-[50%] mt-10 px-3'>
        <form>
          <input
          type= "text"
          id = "name"
          value = {name}
          disabled = {!changeDetail}
          onChange={onChange}
          className= {`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-blue-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
          <input
          type= "email"
          id = "email"
          value = {email}
          disabled
          className= {`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-blue-300 rounded transition ease-in-out `}/>
          <div className = "flex text-center justify-between whitespace-nowrap text-sm sm:text-lg space-x-3">
            <p className='flex items-center mb-6 '>
              Do you want to change you name?
              <span onClick={() => { changeDetail && onsubmit()
              setChangeDetail((prevState) => !prevState)}} className= "text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-3 cursor-pointer" >{changeDetail ? "Apply change" : "Edit"} </span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>

          </div>
        </form>
        <button
        type = "submit"
        className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium  rounded-md shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' >
          <Link to = "/create-posting" className= "flex justify-center items-center">
            <FcLandscape className=' mr-2 text-3xl bg-green-200 rounded-full p-1 border-2' /> Create a Listing
          </Link>
        </button>
      </div>
    </section>

    </div>
  )
}
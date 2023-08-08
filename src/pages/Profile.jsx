import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {FcLandscape} from "react-icons/fc"
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const[changeDetail, setChangeDetail] = useState(false)
  const[listings, setListings] = useState(false);
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
  useEffect(() => {
    async function fetchUserListings(){
      const listingRef = collection(db, "listings");
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)
      let listings = [];
      querySnap.forEach((doc) =>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)

    }
    fetchUserListings()
  },[])
  async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete your posting?")){
      await deleteDoc(doc(db, "listings", listingID))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      )
      setListings(updatedListings)
      toast.success("Listing has been deleted")
    }
  }
  function onEdit(listingID){
    navigate(`/edit-posting/${listingID}`)
  }
  return (
    <div className='gray-backg min-h-screen w-full bg-[#32383D]'>
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
            <FcLandscape className=' mr-2 text-3xl bg-green-200 rounded-full p-1 border-2' /> Create a Posting
          </Link>
        </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mt-6 mx-auto justify-center'>
      {!loading && listings.length > 0 && (
        <>
        <h6 className='text-2xl text-center font-semibold'>My postings</h6>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3  '>
          {listings.map((listing) =>(
            <ListingItem 
            key = {listing.id}
            id = {listing.id}
            onDelete = {() => onDelete(listing.id)}
            onEdit={() => onEdit(listing.id)}
            listing = {listing.data}/>
            ))}
        </ul>
        </>
      )}
    </div>

    </div>
  )
}

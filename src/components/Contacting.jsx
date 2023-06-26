import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../firebase'
import { toast } from 'react-toastify'

export default function Contacting({userRef, listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState("")
    useEffect(() => {
        async function getLandlord(){
            const docRef = doc(db, "users", userRef)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }else{
                toast.error("Could not get the owner of this post's data")
            }
        }
        getLandlord();
    },[userRef]
    )
    function onChange(e){
        setMessage(e.target.value);
    }
    
  return (
    <>{landlord !== null && (
        <div className='flex flex-col w-full'>
            <p className='mb-3 text-[#A1B4C4]'> Contact {landlord.name} about this posting.</p>
            <div>
                <textarea 
                name='message'
                id= "message"
                rows= "2"
                value = {message}
                onChange= {onChange}
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md transition duration-150 ease-in-out focus:bg-white go'>

                </textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=${listing.title}&body=${message}`}>
                <button className='mt-2 w-full px-7 py-3 bg-slate-700 text-white rounded text-sm uppercase shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg active:bg-slate-800 active:shadow-lg text-center'>
                    send Message
                </button>
                
            </a>
        </div>

    )}</>
  )
}

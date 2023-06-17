import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePosting() {
    const navigate = useNavigate()
    const auth = getAuth()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title:"",
        address: "",
        type: "public",
        longitude: 0,
        latitude: 0,
        images: {},
        description: "",
    })
    const {title, address, type, longitude, latitude, description, images} = formData
    function onChange(){


    }
  return (
    <div className='h-screen w-full bg-[#32383D]'>
        <main className='max-w-md px-2 mx-auto'>
            <h6 className='text-2xl text-center p-6 font weight-bold'>Create a Posting</h6>
            <form >
                <p className='text-lg mt-6 font-semibold text-[#A1B4C4]'>Title</p>
                <input 
                type='text'
                id='title'
                value={title}
                onChange={onChange}
                placeholder='Title'
                maxLength="32"
                minLength= "7"
                required
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'/>

                <p className='text-lg font-semibold text-[#A1B4C4]'>Address</p>
                <textarea
                type = "text"
                id='address'
                value={address}
                onChange={onChange}
                placeholder='Address'
                required
                className= 'w-full py-2 px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'/>
                <div className='flex space-x-6 justify-start mb-6'>
                    <div>
                        <p className='text-lg font-semibold text-[#A1B4C4]'>Latitude</p>
                        <input
                        type = "number"
                        id= "latitude"
                        value={latitude}
                        onChange={onChange}
                        min='-90'
                        max = '90'
                        className = "w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center" />
                    </div>
                    <div>
                        <p className='text-lg font-semibold text-[#A1B4C4]'>Longitude</p>
                        <input
                        type = "number"
                        id= "longitude"
                        value={longitude}
                        onChange={onChange}
                        min='-180'
                        max = '180'
                        className = "w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center" />
                    </div>
                </div>
                <p className='text-lg font-semibold text-[#A1B4C4]'>Location</p>
                <div className='flex'>
                    <button type='button'
                    id = "type"
                    onClick={onChange}
                    value="public"
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "private" ? "bg-slate-600 text-white" : "bg-[#202529] text-[#A1B4C4]" }`}>
                        public
                    </button>
                    <button type='button'
                    id = "type"
                    onClick={onChange}
                    value="private"
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "public" ? "bg-slate-600 text-white" : "bg-[#202529] text-[#A1B4C4]" }`}>
                        private
                    </button>
                </div>
                <p className='text-lg font-semibold text-[#A1B4C4] mt-6'>Description</p>
                <textarea
                type="text"
                id="description"
                value={description}
                onChange={onChange}
                placeholder="Description"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <div className='mb-6'>
                    <p className='text-lg font-semibold text-[#A1B4C4]'>Images</p>
                    <p className='text-gray-400'>the first image will be the cover(max 6)</p>
                    <input
                    type = 'file'
                    id = "images"
                    onChange={onChange}
                    accept='.jpg,.png,.jpeg'
                    multiple
                    required
                    className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'/>
                </div>
                <button type= "submit" className=' mt-2 mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Create Posting</button>
            </form>
        </main>

    </div>
  )
}

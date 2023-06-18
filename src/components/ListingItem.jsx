import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
export default function ListingItem({listing, id,  onDelete}) {
  return (

  <li className="relative bg-[#4C555C] flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
        <Link className="contents" to={`/category/${listing.type}/${id}`}>
            <img
            className='h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
            loading='lazy'
            src={listing.imgUrls[0]}
        />
        </Link>
        <Moment
            className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
                {listing.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
            <div className='flex items-center space-x-1'>
                <MdLocationOn className= 'h-4  w-4 text-green-600' />
                <p className='font-semibold text-sm mb-[2px] text-[#A1B4C4] truncate'>
                    {listing.address}
                </p>


            </div>
            <p className='font-semibold m-0 text-xl text-[#A1B4C4] truncate'>{listing.title}</p>

        </div>

        {onDelete && (
            <FaTrash
            className = "absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
            onClick = {() => onDelete(listing.id)}
            />
        )}

  </li>
  )
  
  
}

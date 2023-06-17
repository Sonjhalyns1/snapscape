import React from 'react'
import {Link} from "react-router-dom"
export default function Home() {
  return (
    <div name="home" className="w-full h-screen bg-[#32383D]">
      <div className="text-center flex flex-col justify-center h-full">
        <h1 className="shine-effect">Welcome to Photo Snapscapes</h1>
        <p className="mt-5 text-bold max-w-xl mx-auto text-[#A1B4C4] text-2xl">
          An online community for sharing your amazing photos and the locations where they were taken.
        </p>
        <div className="flex justify-center items-center space-x-3 mt-10">
          <Link to="explore" smooth={true} duration={500}>
            <button className="text-[#A1B4C4] group border-2 px-8 py-3 my-2 flex hover:bg-[#27374D] hover:border-[#27374D] rounded-lg">
              Explore/Discover
              
            </button>
          </Link>
        </div>
        </div>
        </div>
        
  )
}

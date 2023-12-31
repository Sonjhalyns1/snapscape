
import {useEffect, useState} from 'react'
import Logo from '../assets/logo-picture.png'
import { useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default function Navbar() {
    const [pageState, setPageState] = useState("Sign in")
    const auth= getAuth();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() =>{
      onAuthStateChanged(auth, (user) =>{
        if(user){
          setPageState('Profile')
        }else{
          setPageState("Sign in")
        }
      })
    })
    function pathMatchRoute(route){
        if(route === location.pathname){
          return true
        }
    };
  return (
    <div className='bg-[#202529] border-b border-[#32383D] shadow-sm sticky top-0 z-40'> 
        <header className = "flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <img src= {Logo} alt= "logo" className = "h-16 cursor-pointer" onClick={()=>navigate("/")}/>
          </div>
          <div>
            <ul className='flex space-x-10'>
              <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "!text-[#1BC6B4] !border-b-red-500"}`}onClick={()=>navigate("/")}>Home</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/explore") && "!text-[#A1B4C4] !border-b-red-500"}`}onClick={()=>navigate("/explore")}>Explore</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile") )&& "!text-[#A1B4C4] !border-b-red-500"}`}onClick={()=>navigate("/profile")}>{pageState}</li>
              
            </ul>
          </div>
        </header>
    </div>
  )
}

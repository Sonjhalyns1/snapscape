import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
} from "swiper"
import "swiper/css/bundle"
import { useNavigate } from 'react-router'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import Spinner from './Spinner'
import { db } from '../firebase'

export default function Slider() {
    const[listings, setListings] = useState(null)
    const[loading, setLoading] = useState(true)
    SwiperCore.use([Autoplay, Navigation, Pagination])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchListing(){
            const listingRef = collection(db, "listings")
            const q = query(listingRef, orderBy("timestamp", "desc", limit(5)))
            const querySnap = await getDocs(q)
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings);
            setLoading(false)

        }
        fetchListing()

    },[])
    if(loading){
        return <Spinner />
    }
    if(listings.length === 0 ) {
        return <>
        </>
    }

  return listings && <>
  <Swiper
  slidesPerView = {1}
  navigation
  pagination = {{type: "progressbar"}}
  effect = 'fade'
  modules = {[EffectFade]}
  autoplay = {{delay: 5000}}
  >
    {listings.map(({data, id}) =>(
        <SwiperSlide key = {id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div style = {{background: `url(${data.imgUrls[0]})center, no-repeat`, backgroundSize: "cover"}}
            className='relative w-full h-[350px] overflow-hidden  '>

            </div>
            <p className='text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9b] shadow-lg opacity-90 p-2 rounded-br-3xl'>{data.title}</p>
            <p className='text-[#] absolute left-1 bottom-1 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-br-3xl'>{data.type === "public" ? "Public" : "Private"} Location</p>
            
        </SwiperSlide>
    ))}

  </Swiper>
  </>
}

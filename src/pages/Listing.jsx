import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaMapMarkerAlt} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Contacting from '../components/Contacting';

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='gray-backg'>
      <div className='p-4 max-w-4xl lg:mx-auto rounded-lg shadow-lg bg-[#4C555C] lg:space-x-5'>
        <div className='w-full'>
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: 'progressbar' }}
            effect='fade'
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative w-full overflow-hidden h-[600px]'
                  style={{
                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>
        <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-[#4C555C] lg:space-x-5'>
            <div className='w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0'>
                <div className='flex items-center'> 
                    <p className='bg-slate-700 mr-2 w-full max-w-[150px] rounded-md p-1 text-white text-center font-semibold shadow-md'> {listing.type === "public" ? "Public" : "Private"}</p>
                    <p className='mt-3 mb-3  text-bold text-2xl text-center text-[#1BC6B4]'>
                        {listing.title}
                    </p>
                    
                </div>
            
                    <p  className='flex items-center mt-3 mb-3 justify-center font-semibold text-[#A1B4C4]'><FaMapMarkerAlt className = 'text-green-700 mr-1' />{listing.address}</p>
                    
                    <p className='mt-3 mb-3 text-[#A1B4C4]'>
                        <span className='font-semibold mr-2 text-slate-800'>Description - 

                        </span>
                        {listing.description}
                    </p>
                    {listing.userRef !== auth.currentUser?.uid && !contactLandlord &&(
                        <div className=''>
                            <button 
                            onClick={() => setContactLandlord(true)}
                            className='px-7 py-3 bg-slate-700 text-white font-medium  text-sm uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg w-full text-center transition duration-150 ease-in-out '
                            >
                                Contact the owner of this post
                            </button>
                        </div>
                    )}
                    {contactLandlord && (
                        <Contacting userRef = {listing.userRef} listing= {listing}/>
                    )}

            </div>
            <div className='w-full h-[300px] lg:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0'>
            <MapContainer
                center={[listing.geolocation.lat, listing.geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {listing.geolocation.lat && listing.geolocation.lng && (
                <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                    <Popup>{listing.address}</Popup>
                </Marker>
                )}
            </MapContainer>

            </div>
        </div>
        
    </div>
  );
}
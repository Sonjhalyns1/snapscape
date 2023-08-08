import React, { useEffect, useState } from 'react';
import Slider from '../components/Slider';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ListingItem from '../components/ListingItem';
import { Link } from 'react-router-dom';

export default function Explore() {
  // public locations
  const [publicListings, setPublicListings] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        // get the reference
        const listingRef = collection(db, 'listings');

        // create the query
        const q = query(
          listingRef,
          where('type', '==', 'public'),
          orderBy('timestamp', 'desc'),
          limit(3)
        );

        //execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPublicListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);

  const [privateListings, setPrivateListings] = useState(null);
  useEffect(() => {
    async function fetchListing() {
      try {
        // get the reference
        const listingRef = collection(db, 'listings');

        // create the query
        const q = query(
          listingRef,
          where('type', '==', 'private'),
          orderBy('timestamp', 'desc'),
          limit(3)
        );

        //execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPrivateListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);

  return (
    <div className='gray-backg min-h-screen w-full bg-[#32383D]'>
      <Slider />

      <div className='max-w-6xl mx-auto pt-4 space-y-6 text-[#A1B4C4]'>
        {publicListings && publicListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Public locations</h2>
            <Link to='/category/public'>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>
                View more
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              {publicListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {privateListings && privateListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold text-[#A1B4C4]'>Private locations</h2>
            <Link to='/category/public'>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>
                View more
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 '>
              {privateListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

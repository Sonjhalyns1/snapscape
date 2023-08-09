import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';

export default function Category() {
    const [listings, setListings ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchListing] = useState(null);
    const params = useParams()
    useEffect(() => {
        async function fetchListings() {
          try {
            const listingRef = collection(db, "listings");
            const q = query(
              listingRef,
              where("type", "==", params.categoryName),
              orderBy("timestamp", "desc"),
              limit(8)
            );
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setListings(listings);
            setLoading(false);
          } catch (error) {
            toast.error("Could not fetch listing");
          }
        }
    
        fetchListings();
      }, [params.categoryName]);
    async function onFetchMoreListings(){
        try {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("type", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            startAfter(lastFetchedListing),
            limit(4)
          );
          const querySnap = await getDocs(q);
          const lastVisible = querySnap.docs[querySnap.docs.length - 1];
          setLastFetchListing(lastVisible);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setListings((prevState) =>[...
          prevState, ...listings]);
          setLoading(false);
        } catch (error) {
          toast.error("Could not fetch listing");
        }
      }
  return (
    <div className='gray-backg min-h-screen w-full bg-[#32383D]'>
        <div className='max-w-6xl mx-auto px-3 mb-6'>
        <h6 className='text-3xl text-center p-4 mb-10 font-bold'>
            {params.categoryName === "public" ? "Public locations" : "Private location"}
        </h6>
        {loading ? (
            <Spinner  />
        ) : listings  && listings.length > 0 ? (
            <>
            <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {listings.map((listing) => (
                <ListingItem key = {listing.id} id = {listing.id} listing = {listing.data} />
            ))}
            </ul>
            
            </main>
            {lastFetchedListing && (
            <div className='flex items-center justify-center'>
                <button onClick={onFetchMoreListings} className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded ease-in-out-'>Load more</button>
            </div>
            )}
            
            </>

        ) : (<p> There are no listings!</p>)}

        </div>
    </div>
  )
}

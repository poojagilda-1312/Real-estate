import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";
export const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("https://real-estate-4rd4.onrender.com/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("https://real-estate-4rd4.onrender.com/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaletListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaletListings = async () => {
      try {
        const res = await fetch("https://real-estate-4rd4.onrender.com/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* { top} */}
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl  mx-auto ">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Evergreen Estate is the best place to find your next perfect place to
          live.
          <br />
          we have a wide range of properties for you to choose from.
        </div>
        <Link
          to={`/search`}
          className="text-xs sm:text-sm text-blue-800 font bold hover:"
        >
          Let's Start now...{" "}
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 1 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]} ) center no-repeat `,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings&& offerListings.length >0 && (
          <div>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600" >Recent offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'  }>Show more offers..</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                <h1>mcjc </h1>
                { offerListings.map((listing)=>{ <ListingItem listing={listing} key={listing._id} />
                  })}
              </div>
            </div>
        )}
      </div>  
    </div>

  );
};

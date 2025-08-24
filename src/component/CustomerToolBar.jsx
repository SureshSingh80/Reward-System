import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';

const CustomerToolBar = ({claimedCoupons,setClaimedCoupons,email}) => {

       const [searchTerm,setSearchTerm] = useState("");
      const [deBoundecedSearch,setDeBoundecedSearch] = useState(searchTerm);

    // handle searching    
  useEffect(()=>{
       const handler = setTimeout(()=>{
          setDeBoundecedSearch(searchTerm);
       },1000);
      return () =>{
        clearTimeout(handler); // clear timeout on each key stroke
      }
  },[searchTerm]);

  useEffect(()=>{
      const fetchSearchResults = async ()=>{
          try {
            // searching with user credentials (email)
            const searchResults = await axios.get('/api/fetch-search-coupons?search='+deBoundecedSearch+'&email='+email);
            console.log("search result= ",searchResults.data.message);
            setClaimedCoupons(searchResults.data.message);
          } catch (error) {
            console.log('Error in fetching search results',error);
             
          }
      }

      fetchSearchResults();
  },[deBoundecedSearch]);

    // handle sorting data
  const handleSorting = async(e) => {
    const sort = e.target.value;

    if(!sort){
      console.log("Sort input is required");
      return;
    }

    try {
         const filteredData = await axios.get(`/api/fetch-sorting-coupons?sort=${sort} &email=${email}`);
         console.log("filterdData=",filteredData.data.message);
         setClaimedCoupons(filteredData.data.message);
    } catch (error) {
       console.log("Error in fetching filtered coupons",error);
    }
  }

  return (
    <div className="mt-2 sticky top-0 z-10 bg-white shadow-md p-3   flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-3 w-full">

          {/* Search Feature */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by coupon code..."
              className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>


          {/* Sort Feature */}
          <div className="flex items-center gap-2">
            <span className="w-full  text-gray-600 font-medium">Sort by:</span>
            <select onChange={handleSorting}  className="w-64 sm:w-auto  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
              <option value="">---Select---</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>            
            </select>
          </div>
        </div>
  )
}

export default CustomerToolBar

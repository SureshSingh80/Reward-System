import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminToolBar = ({setCoupons}) => {

  const [searchTerm,setSearchTerm] = useState("");
  const [deBoundecedSearch,setDeBoundecedSearch] = useState(searchTerm);

  // handle filtering data
  const handleFilterChange = async(e) => {
    const filter = e.target.value;

    // validation for filter
    if(!filter){
      console.log("filter input is required");
      return;
    }
    try {
         const filteredData = await axios.get(`/api/admin/fetch-filtered-coupons?filter=${filter}`);
         console.log(filteredData.data.message);
         setCoupons(filteredData.data.message);
    } catch (error) {
       console.log("Error in fetching filtered coupons",error);
    }
  };

  // handle sorting data
  const handleSorting = async(e) => {
    const sort = e.target.value;

    if(!sort){
      console.log("Sort input is required");
      return;
    }

    try {
         const filteredData = await axios.get(`/api/admin/fetch-sorting-coupons?sort=${sort}`);
         console.log(filteredData.data.message);
         setCoupons(filteredData.data.message);
    } catch (error) {
       console.log("Error in fetching filtered coupons",error);
    }
  }
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
            const searchResults = await axios.get(`/api/admin/fetch-search-coupons?search=${deBoundecedSearch}`);
            console.log("search result= ",searchResults.data.message);
            setCoupons(searchResults.data.message);
          } catch (error) {
            console.log('Error in fetching search results',error);
             
          }
      }

      fetchSearchResults();
  },[deBoundecedSearch]);

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

          {/* Filter Feature */}
          <div className="flex items-center gap-2">
            <span className=" w-full text-gray-600 font-medium">Filter:</span>
             
            <select  onChange={handleFilterChange} className="w-64 sm:w-auto  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">---Select---</option>
              <option value="all">All</option>
              <option value="claimed">Claimed</option>
              <option value="unclaimed">Unclaimed</option>
            </select>
          </div>

          {/* Sort Feature */}
          <div className="flex items-center gap-2">
            <span className="w-full  text-gray-600 font-medium">Sort by:</span>
            <select onChange={handleSorting} className="w-64 sm:w-auto  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
              <option value="">---Select---</option>
              <option value='default'>Created At</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="newest">Newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>
        </div>
  
  )
}

export default AdminToolBar
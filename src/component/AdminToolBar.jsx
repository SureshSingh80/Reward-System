import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

const AdminToolBar = ({setCoupons,coupons,allCoupons}) => {

  const [searchTerm,setSearchTerm] = useState("");
  const [deBoundecedSearch,setDeBoundecedSearch] = useState(searchTerm);
  const [filter,setFilter] = useState("");
  const [sort,setSort] = useState("");

  // handle filtering data
  const handleFilterChange = async(e) => {
    
   setFilter(e.target.value);
   setSort("");
   

   
  };

  useEffect(()=>{
       const fetchFilteredCoupons = async ()=>{
             // validation for filter
          if(!filter){
            console.log("filter input is required");
            return;
          }

          if(filter==='all'){
            setCoupons(allCoupons);
            return;
          }
          if(filter==='claimed'){
            const result = allCoupons.filter(coupon => coupon.isClaimed === true);
            setCoupons(result);
          }
          if(filter==='unclaimed'){
            const result = allCoupons.filter(coupon => coupon.isClaimed === false);
            setCoupons(result);
          }
           
       }

       fetchFilteredCoupons();
  },[filter]);

  // handle sorting data
  const handleSorting = async(e) => {
   
    setSort(e.target.value);
    setFilter("");
    
    
  }

  useEffect(()=>{
      const fetchSortedCoupons = async ()=>{
          if(!sort){
            console.log("Sort input is required");
            return;
          }

          // try {
          //     const filteredData = await axios.get(`/api/admin/fetch-sorting-coupons?sort=${sort}`);
          //     console.log(filteredData.data.message);
          //     setCoupons(filteredData.data.message);
          // } catch (error) {
          //   console.log("Error in fetching filtered coupons",error);
          // }
          if(sort==='ascending'){
            const result = [...allCoupons].sort((a,b) => a.rewardsPoint - b.rewardsPoint);
            console.log(result);
            setCoupons(result);
          }

          if(sort==='descending'){
            const result = [...allCoupons].sort((a,b) => b.rewardsPoint - a.rewardsPoint);
            console.log(result);
            setCoupons(result);
          }

          if(sort==='newest'){
            const result = [...allCoupons].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCoupons(result);
          }

          if(sort==='default'){
            const result = [...allCoupons].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setCoupons(result);
          }

      }

      fetchSortedCoupons();
  },[sort]);
  // handle searching

  // useEffect(()=>{
  //      const handler = setTimeout(()=>{
  //         setDeBoundecedSearch(searchTerm);
  //      },1000);
  //     return () =>{
  //       clearTimeout(handler); // clear timeout on each key stroke
  //     }
  // },[searchTerm]);

  // useEffect(()=>{
  //     const fetchSearchResults = async ()=>{
  //         try {
  //           const searchResults = await axios.get(`/api/admin/fetch-search-coupons?search=${deBoundecedSearch}`);
  //           console.log("search result= ",searchResults.data.message);
  //           setCoupons(searchResults.data.message);
  //         } catch (error) {
  //           console.log('Error in fetching search results',error);
             
  //         }
  //     }

  //     fetchSearchResults();
  // },[deBoundecedSearch]);

  // searching
  useEffect(()=>{
    console.log(searchTerm)
      const result = allCoupons.filter(c=> c.couponCode.toLowerCase().includes(searchTerm.toLowerCase()));
      setCoupons(result);
  },[searchTerm,allCoupons]);

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
            <span  className=" w-full text-gray-600 font-medium">Filter:</span>
             
            <select value={filter}  onChange={handleFilterChange} className="w-64 sm:w-auto  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">---Select---</option>
              <option value="all">All</option>
              <option value="claimed">Claimed</option>
              <option value="unclaimed">Unclaimed</option>
            </select>
          </div>

          {/* Sort Feature */}
          <div className="flex items-center gap-2">
            <span className="w-full  text-gray-600 font-medium">Sort by:</span>
            <select value={sort} onChange={handleSorting} className="w-64 sm:w-auto  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
              <option value="">---Select---</option>
              <option value='default'>Created At</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="newest">Newest</option>
             
            </select>
          </div>
        </div>
  
  )
}

export default AdminToolBar
import axios from "axios";
export async function fetchAllCustomers (){
     try {
        const res = await axios.get("/api/admin/fetch-all-customers");
        return {success:true, data:res.data.customers};
     } catch (error) {
        console.log("Error from fetchAllCustomers", error);
        return {success:false, error:error.response.data.message};
     }
}
export function filterCustomer (customers, search){
   console.log("customersdsf= ",customers);
   return (customers || []).filter((customer) =>
  `${customer.name} ${customer.email} ${customer.phone}`
    .toLowerCase()
    .includes(search.toLowerCase()) 
)};
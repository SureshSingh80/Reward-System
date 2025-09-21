"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAllCustomers,
  filterCustomer,
} from "@/utils/admin/fetchAllCustomers";
import { toast, ToastContainer } from "react-toastify";
import NotificationPopUp from "@/component/NotificationPopUp";

export default function ShowCustomers() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationPopUp, setNotificationPopUp] = useState(false);
  const [customerId,setCustomerId] = useState(null);

  useEffect(() => {
    const getCustomers = async () => {
      const result = await fetchAllCustomers();
      console.log("result from fetchAllCustomers= ", result);

      if (result?.success) {
        setCustomers(result.data);
      } else {
        toast.error(result.error);
      }
      setLoading(false);
    };
    getCustomers();
  }, []);

  const filteredCustomers = filterCustomer(customers, search);

  return (
    <>
      <div className={`p-6  min-h-screen bg-gray-200 px-4 text-black ${notificationPopUp ? "blur-sm" : ""}`}>
      
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Customers</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                {/* <th className="px-4 py-2 text-left">Joined</th> */}
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer?.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {customer?.name}
                    </td>
                    <td className="px-4 py-2">{customer?.email}</td>
                    <td className="px-4 py-2">
                      {customer?.phone ? customer?.phone : "N/A"}
                    </td>
                    {/* <td className="px-4 py-2">{customer?.joined}</td> */}
                    <td className="px-4 py-2 text-center flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          router.push(
                            `https://mail.google.com/mail/?view=cm&fs=1&to=${customer?.email}`
                          )
                        }
                        className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-500 hover:text-white transition"
                      >
                        Email
                      </button>
                      <button
                        onClick={() => {
                          setNotificationPopUp(true);
                          setCustomerId(customer?._id);
                        }}
                        className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                      >
                        Send Notification
                      </button>
                      <button
                        
                        className="px-3 py-1 border border-gray-500 text-gray-700 rounded hover:bg-gray-700 hover:text-white transition"
                      >
                        view
                      </button>
                    </td>
                  </tr>
                ))
              ) : loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
     {/* Notification PopUp */}
      <NotificationPopUp
        notificationPopUp={notificationPopUp}
        setNotificationPopUp={setNotificationPopUp}
        customerId={customerId}
      />
    </>
  );
}

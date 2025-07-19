import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-100  text-black">
      <div className="text-blue-500 font-semibold">
        <div className="w-20 h-20 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-4">please wait...</p>
    </div>
  );
};

export default Loader;

import { Ban } from "lucide-react";
import React from "react";

const CouponNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-600">
      <Ban className="w-12 h-12 text-red-500 mb-3" />
      <p className="text-lg font-medium">No Coupon Found</p>
      <span className="text-sm text-gray-400">
        you are tring to find coupon is no longer available
      </span>
    </div>
  );
};

export default CouponNotFound;

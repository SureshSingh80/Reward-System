import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    couponCode:{
        type:String,
        required:true,
        unique:true
    },
    isClaimed:{
        type:Boolean,
        default:false   
    },
    rewardsPoint:{
        type:Number,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Coupons = mongoose.models("Coupons") || mongoose.model("Coupons",couponSchema);

export default Coupons;
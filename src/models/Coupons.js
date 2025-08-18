import {Schema,Types,model,models} from 'mongoose';

const couponSchema = new Schema({
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
    redeemedBy:{
        type:Types.ObjectId,
        ref:"Customers"
    },
    redeemedByEmail:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Coupons = models.Coupons || model("Coupons",couponSchema);

export default Coupons;
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
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedAt: {
        type: Date,
        default: null
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

// index for sorting (ascending order)
couponSchema.index({rewardsPoint:1});
couponSchema.index({createdAt:1});



const Coupons = models.Coupons || model("Coupons",couponSchema);



export default Coupons;
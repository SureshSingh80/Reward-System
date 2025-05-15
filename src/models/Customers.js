import mongoose from "mongoose";



const CustomerSchema = new mongoose.Schema({
    c_id:{
        type:String,
        unique:true,
        required:[true,"uid is required"]
    },
    name:{
        type:String,
        required:[true,"username is required"]
    },
    phone:{
        type:Number,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email is required"]
    },
    address:{
        type:String,     
    },
    reward_point:{
        type:Number
    },
    bank_account_number:{
        type:String
    },
    bank_name:{
        type:String
    }
});

const Customers = mongoose.models.Customers || mongoose.model("Customers",CustomerSchema);
export default Customers;

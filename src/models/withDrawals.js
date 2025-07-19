import {Schema,Types,model,models} from 'mongoose';

const withDrawalSchema = new Schema({

     customer:{
        type:Types.ObjectId,
        ref:"Customers"
     },
     amount:{
        type:Number,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     status:{
        type:String,
        default:"pending"
     }
});

const WithDrawals = models.WithDrawals || model("Withdrawals",withDrawalSchema);
export default WithDrawals;
import {Schema,Types,model,models} from 'mongoose';

const CustomerSchema = new Schema({
  c_id: {
    type: String,
    unique: true,
    required: [true, "uid is required"],
  },
  name: {
    type: String,
    required: [true, "username is required"],
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  address: {
    type: String,
  },
  reedmedCoupons: {
    type: [
      {
        type: Types.ObjectId,
        ref: "Coupons",
      },
    ],
  },
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  totalPoints: {
      type: Number,
      default:0  
  },
  bank_account_number: {
    type: String,
  },
  bank_name: {
    type: String,
  },
});

const Customers = models.Customers || model("Customers", CustomerSchema);
export default Customers;

import { Scheme, models, model } from "mongoose";

const notificationSchema = new Schema({
  title: 
  { type: String, required: true }
  , // e.g. "Coupon Verified"
  message: { type: String, required: true }, // "Your coupon ABC123 has been verified!"
  type: { type: String, enum: ["info", "success", "warning"], default: "info" },
  isRead: { type: Boolean, default: false }, // whether user has seen it
  createdAt: { type: Date, default: Date.now },
});

const Notification = models.Notification || model("Notification", notificationSchema);
export default Notification;


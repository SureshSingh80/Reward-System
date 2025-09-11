import { Schema, models, model } from "mongoose";

const notificationSchema = new Schema({
  title: { 
          type: String, 
          required: true
        },
  message: {
          type: String,
          required: true
         }, 
  type: { 
     type: String, 
     enum: ["info", "success", "warning"], 
     default: "info" 
     },
  isRead: { 
      type: Boolean, 
      default: false 
     }, 
  createdAt: { 
        type: Date, 
        default: Date.now 
      },
});

const Notification = models.Notification || model("Notification", notificationSchema);
export default Notification;


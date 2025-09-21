import { dbConnect } from "@/lib/dbConnect";
import Customers from "@/models/Customers";
import Notification from "@/models/Notification";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    const { notificationId, customerId } = await request.json();
    console.log(
      "delete notificationId=",
      notificationId,
      "customerId=",
      customerId
    );

    if (!notificationId || !customerId) {
      return NextResponse.json(
        { message: "NotificationId and CustomerId are required" },
        { status: 400 }
      );
    }

    session.startTransaction();

    // 1. Remove notification reference from Customer
    const customer = await Customers.findOneAndUpdate(
      { _id: customerId },
      { $pull: { notifications: notificationId } },
      { new: true, session }
    );

    if (!customer) {
      throw new Error("Customer not found or update failed");
    }

    // 2. Delete the actual Notification
    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId,
      { session }
    );

    if (!deletedNotification) {
       throw new Error("Notification not found or delete failed");
    }

    // ✅ Commit if all successful
    await session.commitTransaction();

    console.log("Deleted notification=", deletedNotification._id);

    return NextResponse.json({ message:'notification successfully deleted' }, { status: 200 });
  } catch (error) {
    // ❌ Rollback on error
    await session.abortTransaction();
    console.log("Error in delete notifications=", error);
    return NextResponse.json(
      { message: error.message || "Error in delete notifications" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}

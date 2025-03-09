import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
});

export const Booking = mongoose.model("Booking", bookingSchema);

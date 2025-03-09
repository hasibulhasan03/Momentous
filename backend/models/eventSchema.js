import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
});

export const Event = mongoose.model("Event", eventSchema);

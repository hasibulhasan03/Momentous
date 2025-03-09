import { Booking } from "../models/bookingSchema.js";
import { Event } from "../models/eventSchema.js";
import { User } from "../models/userSchema.js";

//   Create Booking (after login)
export const createBooking = async (req, res) => {
    try {
        const { userId, eventId, paymentStatus } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found!" });
        }

        const newBooking = new Booking({
            username: user.name,
            email: user.email,
            eventName: event.name,
            price: event.price,
            paymentStatus: paymentStatus || "pending",
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful!", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//   Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.params;
        const bookings = await Booking.find({ email });

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found!" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//   Delete Booking
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

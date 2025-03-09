import { Event } from "../models/eventSchema.js";

//   Create Event
export const createEvent = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newEvent = new Event({ name, price });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//   Get All Events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


//   Update Event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found!" });
        }

        res.status(200).json({ message: "Event updated successfully!", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

//   Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found!" });
        }

        res.status(200).json({ message: "Event deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

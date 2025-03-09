import express from "express";
import { createBooking, getUserBookings, deleteBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/book", createBooking);
router.get("/user/:email", getUserBookings);
router.delete("/cancel/:id", deleteBooking);

export default router;

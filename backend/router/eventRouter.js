import express from "express";
import { createEvent, getAllEvents, updateEvent, deleteEvent } from "../controller/eventController.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/all", getAllEvents);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;

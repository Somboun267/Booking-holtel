import * as bookingController from "../controllers/booking.controller.js"
import express from "express"


const router = express.Router()

router.get("/get-booking",bookingController.getbook)
router.post("/create-booking",bookingController.createBooking)
router.put("/update-booking/:id",bookingController.updateBooking)

export default router
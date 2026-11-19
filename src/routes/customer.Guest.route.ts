import express from "express"
import * as customreGuestController from "../controllers/customer.Guest.controller.js"


const router = express.Router()

router.get("/get-customer-guest",customreGuestController.getCustomerGuest)
router.post("/create-customer-guest",customreGuestController.createCustomerGuest)

export default router
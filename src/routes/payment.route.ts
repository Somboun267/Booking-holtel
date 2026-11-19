import * as paymentController from "../controllers/payment.controller.js"

import express from "express"


const router = express.Router()

router.get("/get-payment",paymentController.getPayment)
router.post("/create-payment",paymentController.createPayment)
router.put("/update-payment/:id",paymentController.updatePayment)

export default router
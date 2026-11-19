import * as MaintenanceRequestController from "../controllers/MaintenanceRequest.controller.js"
import express from "express"


const router = express.Router()

router.get("/get-maintenance-request",MaintenanceRequestController.getAll)
router.post("/create-maintenance-request",MaintenanceRequestController.create)
router.put("/update-maintenance-request/:id",MaintenanceRequestController.updateMaintenanceRequest)


export default router
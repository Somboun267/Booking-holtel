import express from "express"
import * as MaintenanceController from"../controllers/MaintenanceProfile.controller.js"


const router = express.Router()

router.get("/get-maintenance",MaintenanceController.getMaintenance)
router.post("/create-maintenance",MaintenanceController.createMaintenance)

router.put("/update-maintenance/:id",MaintenanceController.updateMaintenance)

export default router
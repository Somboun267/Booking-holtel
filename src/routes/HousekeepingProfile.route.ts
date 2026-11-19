import express from "express"
import * as HouseKeepingController from "../controllers/HousekeepingProfile.controller.js"


const router = express.Router()

router.get("/get-housekeeping",HouseKeepingController.getHousekeeping)
router.post("/create-housekeeping",HouseKeepingController.createHousekeeping)


export default router
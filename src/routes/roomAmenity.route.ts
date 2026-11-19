import * as roomAmenityController from "../controllers/roomAmenity.controller.js"
import express from "express"


const router = express.Router()

router.get("/get-room-amenity",roomAmenityController.getAll)
router.get("/get-room-amenity-by/:id",roomAmenityController.getid)

router.post("/create-room-amenity",roomAmenityController.createAmenityRooms)

export default router
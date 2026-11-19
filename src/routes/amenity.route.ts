import express from "express"
import * as amenityController from "../controllers/Amenity.controller.js"

const router = express.Router()

router.get("/get-amenity",amenityController.getAmenity)
router.post("/create-amenity",amenityController.createAmenity)

export default router
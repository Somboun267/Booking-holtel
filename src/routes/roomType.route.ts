import express from"express"
import * as roomTypeController from "../controllers/roomType.controller.js"


const router = express.Router()

router.get("/get-room-type",roomTypeController.get)
router.post("/create-room-type",roomTypeController.createRoomType)
router.put("/update-room-type/:id",roomTypeController.updateRoomType)

export default router
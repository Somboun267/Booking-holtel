import * as roomImageController from "../controllers/roomImage.controller.js"
import express from "express"
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router()

router.get("/get-room-image",roomImageController.getAll)
router.post( "/create-room-image/:roomId",upload.array("images", 10),roomImageController.createRoomImages);
router.delete("/delete-room-image/:id",roomImageController.deleteRoomImage);


export default router
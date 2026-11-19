import express from "express"
import * as roomController from "../controllers/room.controller.js"


const router = express.Router()

router.get("/get-room",roomController.getAll)
router.get("/get-room-by/:id",roomController.getById)

router.post("/create-room",roomController.createRoom)
router.put("/update-room-by/:id",roomController.updateRoom)


export default router
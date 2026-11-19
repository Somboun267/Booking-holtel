import express from "express"
import * as frontdeskController from "../controllers/FrontDeskProfile.controller.js"


const router = express.Router()

router.get("/get-frontdesk",frontdeskController.getall)
router.post("/create-frontdesk",frontdeskController.crateFront)

export default router
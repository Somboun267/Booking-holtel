import * as userController from "../controllers/user.controller.js"
import express from "express"

const router = express.Router()

router.get("/get-user",userController.getUser)
router.get("/get-user-by/:id",userController.getByID)

router.post("/create-user",userController.createUser)
router.post("/login",userController.login)

router.put("/update-user/:id",userController.updateUser)


export default router
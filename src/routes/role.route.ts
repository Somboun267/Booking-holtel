import express from "express"
import * as roleController from "../controllers/role.controller.js"


const router = express.Router()
router.get("/get-role", roleController.getAll);

router.get("/get-role/:id", roleController.getById);

router.get("/get-role/name/:name", roleController.getByname);

router.post("/create-role",roleController.createRole)
router.put("/update-role/:id",roleController.updateRole)
router.delete("/delete-role/:id",roleController.remove)

export default router;
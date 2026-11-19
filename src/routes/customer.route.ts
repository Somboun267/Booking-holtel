import express from"express"
import * as customerController from "../controllers/customer.controller.js";


const router = express.Router()

router.get("/get-customer",customerController.getall)
router.get("/get-customer-by/:id",customerController.getbyId)
router.get("/get-by-name/name/:name",customerController.getbyname)


router.post("/login",customerController.loginCustomer)
router.post("/create-customer",customerController.createCusomer)

router.put("/update-customer/:id",customerController.updateCustomer)


export default router;
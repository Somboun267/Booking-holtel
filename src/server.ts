import express from"express"
import dotenv from"dotenv"
import morgan from "morgan"
import cors from "cors"
//
import roleRoute from "./routes/role.route.js"
import userRoute from "./routes/user.route.js" 
import frontdeskRoute from "./routes/FrontDeskProfile.route.js"
import housekeepingRoute from "./routes/HousekeepingProfile.route.js"
import maintenanceRoute from "./routes/MaintenanceProfile.route.js"
import customerRoute from"./routes/customer.route.js"
import customerGuestRoute from "./routes/customer.Guest.route.js"
import roomTypeRoute from "./routes/roomType.route.js"
import amenityRoute from "./routes/amenity.route.js"
import roomRoute from "./routes/room.route.js"
import roomAmenityRoute from "./routes/roomAmenity.route.js"
import roomImageRoute from "./routes/roomImage.route.js"
import maintenanceRequestRoute from "./routes/MaintenanceRequest.route.js"
import bookingRoute from "./routes/booking.route.js"
import paymentRoute from "./routes/payment.route.js"

dotenv.config()

const app = express()
//
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/uploads",express.static("uploads"))
//
const PORT = process.env.PORT || 3000;

//instane Route
app.use("/api",roleRoute)
app.use("/api",userRoute)
app.use("/api",frontdeskRoute)
app.use("/api",housekeepingRoute)
app.use("/api",maintenanceRoute)
app.use("/api",customerRoute)
app.use("/api",customerGuestRoute)
app.use("/api",roomTypeRoute)
app.use("/api",amenityRoute)
app.use("/api",roomRoute)
app.use("/api",roomAmenityRoute)
app.use("/api",roomImageRoute)
app.use("/api",maintenanceRequestRoute)
app.use("/api",bookingRoute)
app.use("/api",paymentRoute)



app.get("/kk", (req, res) => {
    res.json({
        message: "API running"
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
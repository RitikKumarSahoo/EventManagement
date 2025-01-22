import express from 'express'
import {expressjwt} from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config()

const checkjwt = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
})
const router = express.Router();

import userRouter from './user.js'
import auth from "./auth.js"
import eventRoutes from './event.js'
import pdfRoutes from "./pdfData.js"

// user routes
router.post('/createuser', userRouter.create)
router.post("/login",auth.login)
router.get("/generatepdf",pdfRoutes.get)

router.all("*", checkjwt)  // middlewire

router.get("/users", userRouter.allUsers)
router.get("/userdetails", userRouter.getUser)
router.delete("/user/:id", userRouter.deleteUser)

router.post("/event", eventRoutes.create)
router.get("/events", eventRoutes.allEvents)
router.get("/event/:id", eventRoutes.getEvent)
router.put("/event", eventRoutes.updateEvent)
router.get("/event/:id", eventRoutes.deleteEvent)




export default router
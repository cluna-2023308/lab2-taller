import { Router } from "express";
import { saveAppointment, listAppointmentUser, updateAppointment, cancelAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator, deleteAppointmentValidator } from "../middlewares/appointment-validators.js";
import { getUserByIdValidator } from "../middlewares/user-validators.js";
 
const router = Router();
 
router.post("/createAppointment", createAppointmentValidator, saveAppointment);
router.get("/listAppointmentUser/:uid", getUserByIdValidator, listAppointmentUser);
router.put("/updateAppointment/:appointmentId", updateAppointmentValidator, updateAppointment);
router.delete("/cancelAppointment/:appointmentId", deleteAppointmentValidator, cancelAppointment);

export default router;
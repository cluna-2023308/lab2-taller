import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    });
  }
}

export const getAppointment = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };
    const { uid } = req.params

    try {
        const appointment = await Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const appointmentWithOwnerNames = await Promise.all(pets.map(async (appointment) => {
            const owner = await User.findById(appointment.keeper);
            return {
                ...pet.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrado",
            };
        }));

        const total = await Pet.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            appointment: appointmentWithOwnerNames,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las citas',
            error
        });
    }
}
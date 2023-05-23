const {
	addAppointment,
    getAppointment,
    getAllAppointments,
    updateAppointment,
    destroyAppointment,
	addAppointmentReservation,
    getAppointmentReservation,
    getAllAppointmentReservations,
    updateAppointmentReservation,
    destroyAppointmentReservation,
} = require('./handler');
const router = require('express').Router();

// Appointment

router.post('/createAppointment', addAppointment);

router.get('/getAppointment/:id', getAppointment);

router.get('/getAllAppointments', getAllAppointments);

router.put('/updateAppointment/:id', updateAppointment);

router.delete('/deleteAppointment/:id', destroyAppointment);

// AppointmentReservation

router.post('/createAppointmentReservation', addAppointmentReservation);

router.get('/getAppointmentReservation/:id', getAppointmentReservation);

router.get('/getAllAppointmentReservations', getAllAppointmentReservations);

router.put('/updateAppointmentReservation/:id', updateAppointmentReservation);

router.delete('/deleteAppointmentReservation/:id', destroyAppointmentReservation);

// somewhere between :)



module.exports = router;

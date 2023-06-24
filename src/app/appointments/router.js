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
    getAllReservationForOneAppointment,
    searchReservation,
} = require('./handler');
const router = require('express').Router();

// Appointment

router.post('/', addAppointment);

router.get('/:id', getAppointment);

router.get('/', getAllAppointments);

router.put('/:id', updateAppointment);

router.delete('/:id', destroyAppointment);

// AppointmentReservation

router.post('/reservation/', addAppointmentReservation);

router.get('/reservations/getAll', getAllAppointmentReservations);

router.get('/reservation/:id', getAppointmentReservation);

router.put('/reservation/:id', updateAppointmentReservation);

router.delete('/reservation/:id', destroyAppointmentReservation);

// somewhere between :)

router.get('/reservation/:appointment_id', getAllReservationForOneAppointment);

router.post('/reservation/search', searchReservation);


module.exports = router;

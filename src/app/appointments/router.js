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
    getAllFutireReservation
} = require('./handler');
const router = require('express').Router();

// AppointmentReservation

router.post('/reservation/', addAppointmentReservation);

router.get('/reservations/getAll', getAllAppointmentReservations);

router.get('/reservation/:id', getAppointmentReservation);

router.put('/reservation/:id', updateAppointmentReservation);

router.delete('/reservation/:id', destroyAppointmentReservation);

// somewhere between :)

router.post('/reservations/search', searchReservation);

router.get('/reservation/:appointment_id', getAllReservationForOneAppointment);

router.get('/future-reservation/:doctor_id', getAllFutireReservation);

// Appointment

router.post('/', addAppointment);

router.get('/:id', getAppointment);

router.get('/', getAllAppointments);

router.put('/:id', updateAppointment);

router.delete('/:id', destroyAppointment);


module.exports = router;

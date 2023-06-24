const { BillModel,AppointmentModel,AppointmentReservationModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Op } = require("sequelize");


class Bill {


    constructor() {

    }

    static async getPatientBill(id) {

        try {
            const appointment = await AppointmentModel.findOne({
                where: {
                    patient_id: id,
                    status: {
                        [Op.ne]: true
                    }
                },
                attributes: ['id'],
            });
            // console.log(appointment);

            const appointmentReservation1 = await AppointmentReservationModel.findAll({
                where: {
                    appointment_id: appointment.id,
                },
                attributes: ['cost', 'comment', 'start'],
            });
            const totalReservationCost = await appointmentReservation1.reduce((acc, curr) => acc + curr.cost, 0);

            const bill = await BillModel.findAll({
                where: {
                    appointment_id: appointment.id,
                    status: {
                        [Op.ne]: 'done'
                    }
                },
                attributes: ['total', 'paid'],
            });
            const totalPaid = await bill.reduce((acc, curr) => acc + curr.paid, 0);

            const result = {
                appointment_details: appointmentReservation1,
                total: totalReservationCost,
                paid: totalPaid
            }

            return {
                data: result,
                code: httpStatus.CREATED,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }

    }


}

module.exports = Bill;

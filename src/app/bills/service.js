const { BillModel,AppointmentModel,AppointmentReservationModel, PatientModel, PayerModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Op } = require("sequelize");


class Bill {


    constructor(data) {
        this.total = data.total;
        this.paid = data.paid;
        this.rest = data.rest;
        this.status = data.status;
        this.tax_id = data.tax_id;
        this.employee_id = data.employee_id;
        this.paient_id = data.paient_id;
        this.appointment_id = data.appointment_id;
    }

    async add() {
        try {
            const result = await BillModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async getPatientBill(id) {
        // id is paient id

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
            const patient = await PatientModel.findByPk(id);

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
                include: [
                    {
                        model: PayerModel,
                        as: 'payer'
                    }
                ]
            });

            // const payer = await PayerModel.findByPk(bill.payer_id);
            const totalPaid = await bill.reduce((acc, curr) => acc + curr.paid, 0);

            const result = {
                patient: patient,
                appointment_details: appointmentReservation1,
                total: totalReservationCost,
                paid: totalPaid,
                bill: bill
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

module.exports = {Bill};

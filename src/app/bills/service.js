const { BillModel,AppointmentModel,AppointmentReservationModel, PatientModel, PayerModel, TaxModel, UserModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Op } = require("sequelize");
const { Sequelize } = require('sequelize');
const { StoreBill } = require('../stores/service');


class Bill {


    constructor(data) {
        this.total = data.total;
        this.paid = data.paid;
        this.rest = data.rest;
        this.status = data.status;
        this.tax_id = data.tax_id;
        this.employee_id = data.employee_id;
        // this.paient_id = data.paient_id;
        this.appointment_id = data.appointment_id;
        this.payer_id = data.payer_id;
    }

    // async addBill() {
    //     try {
    //         const result = await BillModel.create(this);
    //         return {
    //             data: result,
    //             code: httpStatus.CREATED,
    //         };
    //     } catch (error) {
    //         return {
    //             data: error.message,
    //             code: httpStatus.BAD_REQUEST,
    //         };
    //     }
    // }
    async add() {
        try {
            // const payer = await PayerModel.findOne({
            //     where: {
            //         first_name: data.first_name,
            //         last_name: data.last_name,
            //         phone: data.phone
            //     }
            // });
            // if (payer) {
            //     data.payer_id = payer.id;
            // } else {
            //     const newPayer = await new Payer(data).add();
            //     data.payer_id = newPayer.id;
            // }
            const result = await BillModel.create(this);
            // const result = await BillModel.create(this);
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
            const appointments = await AppointmentModel.findAll({
                where: {
                    patient_id: id,
                    status: {
                        [Op.ne]: "paid"
                    },
                },
                attributes: ['id', 'title'],
                include: [
                    {
                        model: AppointmentReservationModel,
                        as: 'appointment_reservations',
                        attributes: ['cost', 'comment', 'start'],
                    },
                    {
                        model: BillModel,
                        as: 'bills',
                    },
                    {
                        model: UserModel,
                        as: 'doctor',
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'phone',
                            'city',
                            'region',
                            'street',
                            'near_by',
                            'gender',
                            'birthdate'
                        ]
                    }
                ]
            });
            // console.log(appointment);
            const patient = await PatientModel.findByPk(id);

            // const appointmentReservation1 = await AppointmentReservationModel.findAll({
            //     where: {
            //         appointment_id: appointment.id,
            //     },
            //     attributes: ['cost', 'comment', 'start'],
            // });
            let totalReservationCost = 0;
            let ids =[];
            let sumtTalReservationCost = 0;
            for (let i = 0; i < appointments.length; i++) {
                totalReservationCost = await appointments[i].appointment_reservations.reduce((acc, curr) => acc + curr.cost, 0);
                ids.push(appointments[i].id);
                const totalPaid = await appointments[i].bills.reduce((acc, curr) => acc + curr.paid, 0);
                appointments[i].setDataValue("paid", totalPaid);
                appointments[i].setDataValue("total", totalReservationCost);
                sumtTalReservationCost += totalReservationCost;
            }
            
            // const totalReservationCost = await appointmentReservation1.reduce((acc, curr) => acc + curr.cost, 0);

            const bill = await BillModel.findAll({
                where: {
                    appointment_id: {
                        [Op.in]: ids
                    },
                    // status: {
                    //     [Op.ne]: 'done'
                    // }
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

            // total for all his appointments
            const result = {
                patient: patient,
                appointment_details: appointments,
                total: sumtTalReservationCost,
                paid: totalPaid,
                // bill: bill,
                rest: sumtTalReservationCost - totalPaid
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

    static async getAllPatientsBills() {

        try {

            const patients = await PatientModel.findAll({
                include: [
                    {
                        required: true,
                        model: AppointmentModel,
                        as: 'appointments',
                        order: [['createdAt', 'ASC']],
                        limit: 1,
                        include: [
                            {
                                model: UserModel,
                                as: "doctor",
                                attributes: [
                                    'first_name',
                                    'last_name',
                                    'phone',
                                    'city',
                                    'region',
                                    'street',
                                    'near_by',
                                    'gender'
                                ]
                            }
                        ]
                    }
                ],
            });
            // for (let i = 0; i < patients.length; i++) {
            //     // if (patients[i].appointments[0] == true) {
            //         patients[i].setDataValue("status", appointments[0].status);
            //         // patients[i].dataValues.status = "unfinished";
            //     // } else {
            //         // patients[i].dataValues.status = "unfinished";
            //     //     patients[i].setDataValue("status", "unfinished");
            //     // }
            // }

            return {
                data: patients,
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

class Payer {

    constructor (data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.phone = data.phone;
        this.address = data.address;
    }

    async add (data) {

        try {

            const result = await PayerModel.findOne({
                where: {
                    phone: data.phone
                }
            });
            if (!result) {
                result = await PayerModel.create(this);
            }
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
}


class Tax {

    constructor (data) {
        this.percent = data.percent;
    }

    async add () {

        try {

            const result = await TaxModel.create(this);
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

    static async currentTax () {

        try {

            const result = await TaxModel.findOne({
                order: [["created_at", "DESC"]],
                limit: 1
            });

            console.log("result");
            console.log(result);

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
}

module.exports = {Bill, Payer, Tax};

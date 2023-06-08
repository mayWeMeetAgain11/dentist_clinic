const { UserModel, DoctorDocumentModel, DoctorAccommodationModel, AbsenceOrderModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Op } = require('sequelize');




class User {

    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.card_id = data.card_id;
        this.email = data.email;
        this.password = data.password;
        this.phone = data.phone;
        this.city = data.city;
        this.region = data.region;
        this.street = data.street;
        this.near_by = data.near_by;
        this.birthdate = data.birthdate;
        this.gender = data.gender;
        this.deserve = data.deserve;
        this.type = data.type;
    }
    static async getAllUsers(type) {
        try {
            let result;
            if (type === "Doctor") {
                result = await UserModel.findAll({
                    where: {
                        type: {
                            [Op.eq]: type,

                        }
                    },
                    include: [{
                        model: DoctorDocumentModel,
                        as: 'doctor_documents',
                    },
                    {
                        model: DoctorAccommodationModel,
                        as: 'doctor_accommodations',
                    }
                    ]
                });
            }
            else {
                result = await UserModel.findAll({
                    where: {
                        type: {
                            [Op.eq]: type,

                        }
                    }
                });
            }
            console.log(result);
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }


    async addUser() {

        try {
            const result = await UserModel.create(this);
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

    static async getOneUser(id, type) {

        try {
            let result;
            if (type === "Doctor") {
                result = await UserModel.findByPk(id, {
                    include: [
                        {
                            model: DoctorDocumentModel,
                            as: 'doctor_documents',
                        },
                    ],
                });
            } else {
                result = await UserModel.findByPk(id);
            }


            // token = result.generateToken();
            // console.log(token);
            if (result === null) {
                return {
                    data: "NOT FOUND",
                    code: httpStatus.NOT_FOUND,
                };
            }
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }


    async updateUser(id) {
        try {
            const result = await UserModel.update(
                this,
                {
                    where: {
                        id: id,
                    },
                }
            );
            // console.warn(result[0]);
            if (result[0] == 1) {
                return {
                    data: 'updated',
                    code: httpStatus.UPDATED,
                };
            } else {
                return {
                    data: 'something wrong happened',
                    code: httpStatus.BAD_REQUEST,
                };
            }
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async deleteUser(id) {
        try {
            const result = await UserModel.destroy({
                where: {
                    id: id,
                },
            });
            if (result == 1) {
                return {
                    data: 'deleted',
                    code: httpStatus.OK,
                };
            } else {
                return {
                    data: 'something wrong happened',
                    code: httpStatus.BAD_REQUEST,
                };
            }
        } catch (error) {
            console.error(error.message);
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async login(data) {
        console.log(data);
        try {
            const result = await UserModel.findOne(
                {
                    where: {
                        email: data.email
                    }
                }
            );
            // console.log(result);
            if (result === null) {
                return {
                    data: 'there is no user with this email',
                    code: httpStatus.VALIDATION_ERROR,
                }

            }
            if (result.password != data.password) {
                return {
                    data: 'the password is not correct',
                    code: httpStatus.VALIDATION_ERROR,
                }
            }
            console.log('dddddddddddddddddd');
            console.log(result.shit());
            const token = result.generateToken();
            console.log('ffffffffffffff');
            console.log(token);
            return {
                data: { result: result, token: token },
                code: httpStatus.CREATED,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }

}


class DoctorDocument {

    constructor(data, path) {
        this.comment = data.comment;
        this.document = path;
        this.doctor_id = data.doctor_id;
    }

    static async getAllDocument(id) {

        try {

            const result = await DoctorDocumentModel.findAll({
                where: {
                    doctor_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addDocument() {

        try {

            const result = await DoctorDocumentModel.create(this);
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


class DoctorDocumentAccommodation {

    constructor(data, path) {
        this.end_date = data.end_date;
        this.document = path;
        this.doctor_id = data.doctor_id;
    }

    static async getAllDocumentAccommodation(id) {

        try {

            const result = await DoctorAccommodationModel.findAll({
                where: {
                    doctor_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addDocumentAccommodation() {

        try {

            const result = await DoctorAccommodationModel.create(this);
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

class AbsenceOrder {

    constructor(data, path) {
        this.accepted = data.accepted;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.user_id = data.user_id;
    }

    static async getAllAbsenceOrder(id) {

        try {

            const result = await AbsenceOrderModel.findAll({
                where: {
                    user_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addAbsenceOrder() {

        try {

            const result = await AbsenceOrderModel.create(this);
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


module.exports = { User, DoctorDocument, DoctorDocumentAccommodation, AbsenceOrder };  
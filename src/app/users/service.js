const { UserModel } = require('../../app');
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

            const result = await UserModel.findAll({
                where: {
                    type: {
                        [Op.eq]: type,
                    
                }
            }});
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

    static async getOneUser(id) {

        try {
            
            const result = await UserModel.findByPk(id);
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








}

module.exports = User;
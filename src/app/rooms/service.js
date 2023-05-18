const { httpStatus, console } = require('../../../utils/index');
const {ChairModel, DepartmentModel, RoomModel, AppointmentReservationModel} = require('./models');


class Chair {
	constructor(data) {
		this.number = data.number;
	}

	async add() {
		try {
			const result = await ChairModel.create(this);
			return { data: result, code: httpStatus.CREATED };
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await ChairModel.update(this, {
				where: {
					id: id,
				},
			});
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
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
            const chairWithFutureReservation = await ChairModel.findOne({
                where: {
                    chair_id: id,
                },
                include: {
                    model: AppointmentReservationModel
                }
            });
            if (chairWithFutureReservation) {
                return {
                    data: chairReservation,
                    code: httpStatus.Multiple_Choices
                };
            }
			const removedChair = await ChairModel.destroy({
				where: {
					id: id,
				},
			});
            const result = await ChairModel.findOne({
                where: {
                    chair_id: id,
                },
                include: {
                    model: AppointmentReservationModel
                }
            });
			if (result[0] == 1) {
				return {
					data: 'deleted',
					code: httpStatus.DELETED,
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

    async getAll() {
		try {
			const result = await ChairModel.findAll();
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}


module.exports = {
	Chair,
    Department,
    Room
};

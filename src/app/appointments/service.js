// const { where } = require('sequelize');
const { httpStatus, console } = require('../../../utils/index');
const {AppointmentModel, AppointmentReservationModel} = require('../index');
const {Op} = require('sequelize');

class Appointment {
	constructor(data) {
		this.title = data.title;
		this.status = data.status;
		this.patient_id = data.patient_id;
		this.doctor_id = data.doctor_id;
		this.employee_id = data.employee_id;
	}

	async add() {
		try {
			const result = await AppointmentModel.create(this);
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
			const result = await AppointmentModel.update(this, {
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
			const result = await AppointmentModel.destroy({
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

    static async getAll() {
		try {
			const result = await AppointmentModel.findAll();
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
	
    static async get(id) {
		try {
			const result = await AppointmentModel.findOne({
				where: {
					id: id
				}
			});
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

class AppointmentReservation {
	constructor(data) {
		this.cost = data.cost;
		this.start = data.start;
		this.end = data.end;
		this.done = data.done;
		this.comment = data.comment;
		this.appointment_id = data.appointment_id;
		this.chair_id = data.chair_id;
	}

	async add() {
		try {
			const result = await AppointmentReservationModel.create(this);
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
			const result = await AppointmentReservationModel.update(this, {
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
			const removedReservation = await AppointmentReservationModel.destroy({
				where: {
					id: id,
				},
			});
			if (removedReservation == 1) {
				return {
					data: 'deleted',
					code: httpStatus.OK,
				};
			} 
			else {
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

    static async getAll() {
		try {
			const result = await AppointmentReservationModel.findAll();
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

    static async get(id) {
		try {
			const result = await AppointmentReservationModel.findOne({
				where: {
					id: id
				},
			});
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

	// i should be carful with full empty days and the start working time if the first session is in the middle of the day
	// i should open a socket for choosing the doctor
	static async search(date, doctor_id, treatmentType) {
		try {
			let result;
			let emptyDate = [];
			if (date && doctor && treatmentType) {		
				result = await AppointmentReservationModel.findAll({
					where: {
						start: {
							[Op.gte]: date
						}
					},
					include: [
						{
							model: UserModel,
							where: {
								id: doctor_id,
								type: treatmentType
							}
						}
					]
				});
				for (let i = 0; i < result.length - 1; i++) {
					end = result[i].end;
					start = result[i+1].start;
					if (end == start) {
						continue;
					}
					else {
						emptyDate.push({"start": end, "end": start - end});
					}
				}
			}
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
	Appointment,
    AppointmentReservation
};

const {
	addRoom,
    getRoom,
    getAllRooms,
    updateRoom,
    destroyRoom,
	addDepartment,
    getDepartment,
    getAllDepartments,
    updateDepartment,
    destroyDepartment,
	addChair,
    getChair,
    getAllChairs,
    updateChair,
    destroyChair,
} = require('./handler');
const router = require('express').Router();

// Room

router.post('/createRoom', addRoom);

router.get('/getRoom/:id', getRoom);

router.get('/getAllRooms', getAllRooms);

router.put('/updateRoom/:id', updateRoom);

router.delete('/deleteRoom/:id', destroyRoom);

// Department

router.post('/createDepartment', addDepartment);

router.get('/getDepartment/:id', getDepartment);

router.get('/getAllDepartments', getAllDepartments);

router.put('/updateDepartment/:id', updateDepartment);

router.delete('/deleteDepartment/:id', destroyDepartment);

// Chair

router.post('/createChair', addChair);

router.get('/getChair/:id', getChair);

router.get('/getAllChairs', getAllChairs);

router.put('/updateChair/:id', updateChair);

router.delete('/deletechair/:id', destroyChair);

module.exports = router;

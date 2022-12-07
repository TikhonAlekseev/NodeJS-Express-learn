const { Router } = require("express");
const room = require("../models/room");
const Room = require("../models/room");
const router = new Router;

router.get('/', async (request, response) => {
    try{
        const rooms = await Room.find();
        const roomsFormats = rooms.map(room =>( { id:room._id.toString(), name:room.name }))
        response.json(roomsFormats)
    }
    catch(e){
        console.error("Проблема с запросом всех комнат")
    }
})

router.post('/add', async (request, response) => {
    const { name } = request.body;
    try{
        const room = await Room.create({name})
        response.json({ message:"room is added", room })
    }
    catch(e){
        console.error("Ошибка записи в базу данных")
    }
})

router.delete('/remove/:id', async (request, response) => {
    const {id} = request.params;
    try {
        await Room.findByIdAndDelete(id)
        response.json({message:'Комната успешно удалена!'})
    } catch (error) {
        console.error("Ошибка удаления")
    }
})

module.exports = router;

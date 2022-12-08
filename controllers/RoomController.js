const RoomService = require('../service/RoomService')

class RoomController {
    async getRooms(request, response) {
        try{
            const rooms = await RoomService.getRooms();
            console.log(rooms)
            return response.json(rooms)
        }
        catch(e){
            response.status(500).json({ message:"Проблема с запросом всех комнат", error: e })
        }
    }

    async createRoom(request, response) {

        try{
            const { name } = request.body;
            await RoomService.createRoom(name)
            return response.json({ message:"room is created"})
        }
        catch(e){
            response.status(500).json({message:"Ошибка записи в базу данных", error: e})
        }
    }

    async deleteRoom(request, response) {
       
        try {
            const { id } = request.params;
            await RoomService.deleteRoom(id)
            response.json({message:'Комната успешно удалена!'})
        } catch (error) {
            response.status(500).json({message:"Ошибка удаления", error: e})
        }
    }
}

module.exports = new RoomController();
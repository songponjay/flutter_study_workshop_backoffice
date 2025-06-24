const { PrismaClient } = require ('../generated/prisma/client');
const { list, remove } = require('./RoomController');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            const fileRoom = req.files.fileRoom;
            fileRoom.mv("./uploads/" + fileRoom.name, async (err) => {
                if (err) throw err;

                await prisma.roomImage.create({
                    data: {
                        roomId: parseInt(req.params.roomId),
                        name: fileRoom.name,
                    },
                });

                return res.send({ message: "success" })
            });
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    list: async (req, res) => {
        try {
            const roomId = parseInt(req.params.roomId);
            const results = await prisma.roomImage.findMany({
                where: {
                    roomId: roomId,
                },
            });
            return res.send({ results: results });
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    },
    remove: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const row = await prisma.roomImage.findFirst({
                where: {
                    id: id,
                },
            });
            const imageName = row.name;

            const fs = require("fs");
            fs.unlinkSync("./uploads/" + imageName);

            await prisma.roomImage.delete({
                where: {
                    id: id,
                },
            });
            
            return res.send({ message: "success" });
        } catch (e) {
            return res.status(500).send({ error: e.message });
        }
    },
};
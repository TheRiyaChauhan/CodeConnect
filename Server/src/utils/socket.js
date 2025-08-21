const socket = require('socket.io');
const { Chat } = require('../models/Chat');

const initializeSocket = (server) => {

    const io = socket(server, {
        cors: { 
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        //handle events
        socket.on('joinChat', ({firstName,userId,targetUserId}) => {
            const roomId = [userId, targetUserId].sort().join('-');

            console.log(firstName +"joining room:", roomId);
            socket.join(roomId);
        })

        socket.on('sendMessage', async({firstName, lastName, userId, targetUserId, text}) => {
            try {
                const roomId = [userId, targetUserId].sort().join('-');
            console.log(`${firstName} ${lastName} sent a message in room: ${roomId} : ${text}`);

            let chat = await Chat.findOne({
                participants: { $all: [userId, targetUserId] },
            });

            if (!chat) {
                chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
                });
            }

            chat.messages.push({
                senderId: userId,
                text,
            });

            await chat.save();
            
            io.to(roomId).emit('messageReceived', {
                firstName,
                lastName,
                text,
            });
            } catch (error) {
                console.log("Error sending message:", error);
            }
        })

        socket.on('disconnect', () => {})
    });
}

module.exports = initializeSocket;
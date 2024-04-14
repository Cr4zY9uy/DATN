import chat_model from "../models/chat_model.js";

const getChatroomDetail = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const chatroom = await chat_model.findOne({ roomId: roomId }).select("-_id");
        if (!chatroom)
            return res.status(404).json({ message: "Chat room not found" });

        const sortedMessages = chatroom.message.sort((a, b) => b.day - a.day);

        return res.status(200).json(sortedMessages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



const getChatrooms = async (req, res) => {
    try {
        const rooms = await chat_model.find({})
        if (rooms.length === 0)
            return res.status(404).json({ message: "Chatrooms not existed" });

        return res.json(rooms);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { roomId, content } = req.body;
        const { _id, role } = req.user;
        const roomFind = role === 0 ? _id : roomId
        console.log(roomFind);
        const room = await chat_model.findOne({ roomId: roomFind });

        if (room) {
            room.message.push({
                sender: {
                    id: _id,
                    role: role,
                },
                content: content,
            });
            await room.save();
        } else {
            // Optional: Create room if it doesn't exist
            const createdRoom = await chat_model.create({
                roomId: _id,
                message: {
                    sender: {
                        id: _id,
                        role: role,
                    },
                    content: content,
                },
            });
            // Handle creation success (optional)
        }

        const updatedRoom = await chat_model.findOne({ roomId: roomFind });
        const projectedMessages = updatedRoom.message.map((msg) => ({
            senderId: msg.sender.id,
            senderRole: msg.sender.role,
            content: msg.content,
            isRead: msg.isRead,
        }));
        return res.status(200).json(projectedMessages);
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
};


export { getChatroomDetail, getChatrooms, sendMessage };

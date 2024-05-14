import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
    //createdAt, updatedAt   //MongoDB created these fields for us.
}, {timestamps :true});    //we used timestamp to get the details like when the message sent or receive.

const Message = mongoose.model("Message", messageSchema);

export default Message;
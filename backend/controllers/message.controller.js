import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
   try {
        const {message} = req.body;
        const {id: receiverId } = req.params;       // It is destructuring ... it is same as (const id = req.params.id), we name id as receiverId here.
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
          participants: {$all: [senderId, receiverId] },   //it is a mongodb command to get all participants having this senderId.
        })

        if(!conversation){
          conversation = await Conversation.create({
               participants: [senderId, receiverId],
          })
        }

        const newMessage = new Message({
          senderId,
          receiverId,
          message
        })

        if(newMessage) {
          conversation.messages.push(newMessage._id);
        }

        //Socket IO functionality will go here.

     //    await conversation.save();
     //    await newMessage.save();         // to add msg in database

     //this will run in parallel, the above method is slow because first conversation save then newMessage will run.
     await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

     } catch (error) {
        console.log("Error in sendMessage controller:", error.message)
        res.status(500).json({error: "Internal server error"});
   }
};

export const getMessages = async (req,res) => {
     try {
          const {id: userToChatId} = req.params;    //userToChatId is the user id that we are chatting with.
          const senderId = req.user._id;

          const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
          }).populate("messages");  //Not reference but actual messages

          if(!conversation) return res.status(200).json([]);

          const messages = conversation.messages

          res.status(200).json(messages);

     } catch (error) {
          console.log("Error in getMessages controller:", error.message)
          res.status(500).json({error: "Internal server error"}); 
     }
}
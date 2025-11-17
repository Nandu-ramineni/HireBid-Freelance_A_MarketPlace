import Chat from "../Models/Chat.js";
import { hashMessage } from "../Services/hashService.js";
import { publishMessage } from "../Services/rabbitmqService.js";


export const sendMessage = async(req,res) => {
    const {jobId,clientId,freelancerId,message} = req.body;
    const {userId} = req.user;
    try {
        // const hashedMessage = await hashMessage(message);
        let chat = await Chat.findOne({jobId});
        if(!chat){
            chat = new Chat({
                jobId,
                clientId,
                freelancerId,
                messages: [{sender:userId,message}]
            });
        }else{
            chat.messages.push({sender:userId,message});
        }
        await chat.save();
        publishMessage({jobId,sender:userId,message});
        return res.status(200).json({success:true,message:"Message sent successfully",chat});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export const getChatByJobId = async(req,res) => {
    const {jobId} = req.params;
    try {
        const chat = await Chat.findOne({jobId});
        if(!chat){
            return res.status(404).json({success:false,message:"Chat not found"});
        }
        return res.status(200).json({success:true,chat});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}
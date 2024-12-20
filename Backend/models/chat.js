import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
    {
        sender : {
            type : String,
            required : true,
        },
        reciever : {
            type : String,
            required : true,
        },
        messages : [String]
    }
)

const chat = mongoose.model('chat' , chatSchema)

export default chat
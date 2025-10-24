import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)
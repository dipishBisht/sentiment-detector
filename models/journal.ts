import mongoose, { Schema } from "mongoose";

const JournalSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const JournalModel = mongoose.model("Journals", JournalSchema);
import { model, Schema } from "mongoose"
import { Block } from "../types/Block"

export default model<Block>("Block", new Schema<Block>({
    index: { type: Number, required: true, unique: true },
    timestamp: { type: Date, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    previousHash: { type: String, required: true },
    hash: { type: String, required: true }
}, {
    timestamps: true
}))
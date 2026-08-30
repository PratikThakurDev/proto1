import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    sources: { type: [mongoose.Schema.Types.Mixed], default: [] }
  },
  { _id: true, timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: { type: String, default: "New conversation" },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    },
    messages: [chatMessageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);

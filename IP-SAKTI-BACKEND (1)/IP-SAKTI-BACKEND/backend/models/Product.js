import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    intendedUse: { type: String, default: "" },
    traditionalKnowledge: { type: Boolean, default: false },
    targetMarket: { type: String, default: "India" },
    developmentStage: { type: String, default: "Prototype" },
    jurisdiction: { type: String, default: "India" },
    latestPassport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passport",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

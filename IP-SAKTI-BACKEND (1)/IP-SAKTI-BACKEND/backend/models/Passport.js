import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema(
  {
    recordId: String,
    title: String,
    source: String,
    classification: String,
    jurisdiction: String,
    distance: Number,
    text: String
  },
  { _id: false }
);

const passportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },
    productName: String,
    category: String,
    reason: String,
    confidence: {
      type: String,
      enum: ["high", "medium", "low", "unknown"],
      default: "unknown"
    },
    jurisdiction: String,
    inputSnapshot: mongoose.Schema.Types.Mixed,
    evidence: [evidenceSchema],
    rawRagResponse: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model("Passport", passportSchema);

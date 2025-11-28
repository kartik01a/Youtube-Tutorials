// models/Tutorial.ts
import { Schema, model, models } from "mongoose";

const TutorialSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    youtubeUrl: { type: String }, // optional: link to video
    rawSteps: { type: String, required: true }, // your text with * and ->
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Tutorial =
  models.Tutorial || model("Tutorial", TutorialSchema);

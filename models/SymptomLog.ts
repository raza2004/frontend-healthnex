import mongoose, { Schema, Document } from "mongoose";

export interface ISymptomLog extends Document {
  text: string;
  parsed: any;
  diagnosis: any;
  createdAt: Date;
}

const SymptomLogSchema = new Schema({
  text: { type: String, required: true },
  parsed: { type: Schema.Types.Mixed },
  diagnosis: { type: Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.SymptomLog ||
  mongoose.model<ISymptomLog>("SymptomLog", SymptomLogSchema);

// backend/models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  userData: { type: Object, default: {} },
  docData: { type: Object, default: {} },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

// ✅ Unique compound index to prevent double booking for same doc/time
// ✅ Unique compound index to prevent double booking for same doc/time (ignores cancelled appointments)
appointmentSchema.index(
  { docId: 1, slotDate: 1, slotTime: 1 },
  { unique: true, partialFilterExpression: { cancelled: false } }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);

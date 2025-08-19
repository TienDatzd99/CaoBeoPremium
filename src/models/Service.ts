// models/Service.ts
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String,
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
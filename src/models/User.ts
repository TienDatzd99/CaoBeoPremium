import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
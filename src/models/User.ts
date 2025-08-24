import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  image: String,
  provider: { type: String, default: 'credentials' }, // 'credentials', 'google'
  providerId: String,
  emailVerified: Date,
  role: { type: String, default: 'user' }, // 'user', 'admin'
  createdAt: { type: Date, default: Date.now },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
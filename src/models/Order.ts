import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, default: 'pending' }, // pending, completed, refunded
  accountDetails: String, // Email/pass hoặc link chia sẻ, gửi sau thanh toán
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
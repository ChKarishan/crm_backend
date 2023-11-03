import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  SaleID: String,
  ItemID: String,
  ItemName: String,
  Price: Number,
  Date: Date,
});

export default mongoose.model('Sale', saleSchema);

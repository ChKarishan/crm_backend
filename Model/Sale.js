import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  SaleID: {type: String,required: true, unique: true },
  ItemID: String,
  ItemName: String,
  Price: Number,
  Date: String,
});

export default mongoose.model('Sale', saleSchema);

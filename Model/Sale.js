import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  saleID: {type: String,required: true, unique: true },
  numberOfPanels: {type: Number,required: true},
  totalWattage: {type: Number, required: true},
  redline: {type: String},
  financingDetails: {type: String},
  Price: Number,
  Date: String,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

export default mongoose.model('Sale', saleSchema);

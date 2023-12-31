import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  // saleID: {type: String,required: true, unique: true },
  numberOfPanels: {type: Number,required: true},
  totalWattage: {type: Number, required: true},
  redline: {type: String},
  financingDetails: {type: String},
  Price: {type: Number},
  Date: {type: String},
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  installers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Installer'}]
});

export default mongoose.model('Sale', saleSchema);

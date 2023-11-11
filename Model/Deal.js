import mongoose from 'mongoose';
import date from 'date-and-time';

const dealSchema = new mongoose.Schema({
  dealId: {type: String,required: true, unique: true },
  amount: String,
  closedate: String,
  dealname: String,
  pipeline: String,
  dealstage: String,
});

export default mongoose.model('Deal', dealSchema);

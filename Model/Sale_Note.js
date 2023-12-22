import mongoose from "mongoose"

const salenoteSchema = new mongoose.Schema({
    sale: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sale', required: true},
    noteText: { type: String },
  });
  
  const Sale_Note = mongoose.model('SaleNote', salenoteSchema);
  
  export default Sale_Note;
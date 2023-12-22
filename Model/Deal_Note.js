import mongoose from "mongoose"

const dealnoteSchema = new mongoose.Schema({
    deal: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Deal', required: true},
    noteText: { type: String },
  });
  
  const Deal_Note = mongoose.model('DealNote', dealnoteSchema);
  
  export default Deal_Note;
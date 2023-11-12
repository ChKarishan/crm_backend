import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    newsId: {type: String,required: true, unique: true },
    heading: {type: String,required: true},
    date: {type: String,required: true},
    discription: String
});

export default mongoose.model('News', newsSchema);

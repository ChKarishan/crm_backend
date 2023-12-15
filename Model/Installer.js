import mongoose from 'mongoose';

const installerSchema = new mongoose.Schema({
    name: { type: String },
    phoneNumber: { type: String },
});

export default mongoose.model('Installer', installerSchema);
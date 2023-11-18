import mongoose from 'mongoose';

const installerSchema = new mongoose.Schema({
    Name: { type: String },
    PhoneNumber: { type: String }
});

export default mongoose.model('Installer', installerSchema);

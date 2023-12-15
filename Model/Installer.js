import mongoose from 'mongoose';

const installerSchema = new mongoose.Schema({
    Name: String,
    PhoneNumber: String,
});

export default mongoose.model('Installer', installerSchema);

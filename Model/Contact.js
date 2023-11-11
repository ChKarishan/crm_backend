import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    contactId: {type: String,required: true, unique: true },
    firstname: String,
    lastname: String,
    phone: String,
    company: String,
    WebSite: String,
    LifeCyclestage: String
});

export default mongoose.model('Contact', contactSchema);

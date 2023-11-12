import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'geneUser' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'geneUser' }],
  profilePicture: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;

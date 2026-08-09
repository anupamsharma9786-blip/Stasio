import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer",
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);


export default userModel;
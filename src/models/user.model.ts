import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(candidate: string): Promise<Boolean>;
}

const userSchema = new Schema<User>(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
        password: { type: String, required: true, minLength: 8 }
    },
    { timestamps: true, collection: "users" }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
}

export const UserModel = mongoose.model<User>("User", userSchema);
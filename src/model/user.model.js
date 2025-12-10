import mongosee from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongosee.Schema;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 10
        },
    },
        {
            timestamps: true
        },

);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next;
    }
    this.password = await bcrypt.hash(this.password, 10);
    next;

});

//compare password method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongosee.model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        default: '',
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true, // Ensures no duplicate emails
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    plane_password: {
        type: String,
        required: [true, 'Plane password is required'],
        minlength: [6, 'Plane password must be at least 6 characters long'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['user', 'admin'],
        default: 'user',
    },
    resetToken: String,
    resetTokenExpiry: Date,

}, {
    timestamps: true,

});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '3d' } // Token expires in 3days
    );
};

const User = mongoose.model('User', userSchema);

module.exports = User; 
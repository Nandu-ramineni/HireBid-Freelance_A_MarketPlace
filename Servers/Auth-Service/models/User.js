import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
    },
    role:{
        type: String,
        enum: ['freelancer', 'client', 'admin'],
        default: 'client',
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    profile:{
        type: String,
    },
    bio:{
        type: String,
        trim: true
    },
    freelancerProfile:{
        skills: [String],
        hourlyRate: Number,
        availability: {
            type: String,
            enum: ['full-time', 'part-time', 'contract']
        },
        experience: String,
        education: String,
        banner: String,
        languages: [String],
        portfolio: [String],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        avgRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 }
    },
    clientProfile:{
        company: String,
        location: String,
        website: String,
        industry: String,
        phoneNumber: String,
        projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        avgRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userStatus:{
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    googleId: {
        type: String,
    },
    facebookId:{
        type: String,
    },
    microsoftId:{
        type: String
    },
    traction: {
        lastLogin: { type: Date },
        loginsCount: { type: Number, default: 0 },
        ipAddresses: [String],
        lastLocation: {
            city: String,
            region: String,
            country: String
        }
    },
    resetPasswordToken:{
        type: String
    },
    resetPasswordExpires:{
        type: Date
    },
    subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription'
        },
    otp: String,
    otpExpires: Date
}, {
    timestamps: true,
});

UserSchema.pre('save', function (next) {
    if (this.role === 'freelancer' && !this.isModified('freelancerProfile')) {
        this.clientProfile = undefined;  
    } else if (this.role === 'client' && !this.isModified('clientProfile')) {
        this.freelancerProfile = undefined; 
    } else if (this.role === 'admin') {
        this.freelancerProfile = undefined; 
        this.clientProfile = undefined;  
    }
    next();
});



const User = mongoose.model('User', UserSchema);
export default User;
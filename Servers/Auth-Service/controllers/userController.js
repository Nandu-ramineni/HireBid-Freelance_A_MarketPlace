import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { createCache, generateAccessToken, generateRefreshToken, getCache, verifyRefreshToken } from "../services/tokenService.js";
import admin from "../firebase/firebase.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { sendOtp, sendResetPasswordEmail, sendWelcomeEmail } from "../utils/nodemailerConfig.js";
import multer from "multer";
import Subscription from "../models/Subscription.js";
import SavedProfiles from "../models/Saved.profiles.js";
import ip from "ip";
import client from "../../Admin-service/utils/cache.js";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'Strict',
    maxAge: 15 * 60 * 1000
}

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage });

export const userRegister = async (req, res) => {
    const { username, email, password, role, firstName, lastName, profile } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username, email, password: hashedPassword, role, firstName, lastName, profile
        });
        await newUser.save();
        const basicSubscription = new Subscription({
            userId: newUser._id,
            plan: 'Basic',
            price: 0,
            status: 'active',
            startDate: new Date(),
            endDate: null 
        });
        await basicSubscription.save();
        newUser.subscription = basicSubscription._id;
        await newUser.save();
        const accessToken = generateAccessToken(newUser._id, newUser.role);
        const refreshToken = generateRefreshToken(newUser._id);
        res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
        await sendWelcomeEmail(newUser.email, newUser.username);
        try {
            await axios.post('http://localhost:5005/api/notifications/send', {
                userId: newUser._id,
                message: 'Welcome to Freelance! Your account has been successfully created.', notificationType: 'in-app'
            });
        } catch (error) {
            console.log('Error while sending welcome notification', error.message);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error while user registration', error: error.message });
    }
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    // const userIp = ip.address();
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email' });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid password' });
        const checkIsActive = user.userStatus === 'suspended' || !user.isActive;
        if (checkIsActive) {
            return res.status(403).json({ message: 'Your account is suspended. Please contact support.' });
        }
        user.traction.lastLogin = new Date();
        user.traction.loginsCount += 1;
        const idx = user.traction.ipAddresses.indexOf(userIp);
        if (idx !== -1) {
            user.traction.ipAddresses.splice(idx, 1); // remove old position
        }
        user.traction.ipAddresses.unshift(userIp);
        user.traction.ipAddresses = user.traction.ipAddresses.slice(0, 5);
        function isBogonIp(ip) {
            return (
                ip === "127.0.0.1" ||
                ip === "::1" ||
                ip.startsWith("192.168.") ||
                ip.startsWith("10.") ||
                ip.startsWith("172.16.") // private ranges
            );
        }

        if (!isBogonIp(userIp)) {
            try {
                const response = await fetch(`https://ipinfo.io/${userIp}?token=${process.env.IPINFO_TOKEN}`);
                const data = await response.json();

                if (data && !data.bogon) {
                    user.traction.lastLocation = {
                        city: data.city,
                        region: data.region,
                        country: data.country
                    };
                }
            } catch (err) {
                console.log("Location fetch failed:", err.message);
            }
        } else {
            console.log("Skipping location fetch for local IP:", userIp);
        }

        await user.save();
        const accessToken = generateAccessToken(user._id, user.role, user.tokenVersion);
        const refreshToken = generateRefreshToken(user._id);
        // res.cookie('accessToken', accessToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60* 1000});
        // res.cookie('refreshToken', refreshToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000});
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error while user login', error: error.message });
    }
}

export const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.status(403).json({ message: 'Refresh token is required' });
        const newAccessToken = await verifyRefreshToken(refreshToken);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token', error: error.message });
    }
}


export const getUsers = async (req, res) => {
    try {
        let cacheKey = 'filteredUsers';
        let cachedUsers = await getCache(cacheKey);
        if (cachedUsers) {
            return res.status(200).json(cachedUsers);
        } else {
            const users = await User.find();
        const filteredUsers = users.map(user => {
            const userObject = user.toObject();
            if (user.role === 'freelancer') {
                delete userObject.clientProfile;
            } else if (user.role === 'client') {
                delete userObject.freelancerProfile;
            } else if (user.role === 'admin') {
                delete userObject.freelancerProfile;
                delete userObject.clientProfile;
            }
            return userObject;
        });
        await createCache(cacheKey, { filteredUsers }, 3600); // Cache for 1 hour
        res.status(200).json(filteredUsers);
    }
    } catch (error) {
        res.status(500).json({ message: 'Error while getting users', error: error.message });
    }
}

export const getUserById = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User.findById(userId).populate('subscription');
        if (!user) return res.status(404).json({ message: 'User not found' });
        const filteredUser = user.toObject();
        if (user.role === 'freelancer') {
            delete filteredUser.clientProfile;
        } else if (user.role === 'client') {
            delete filteredUser.freelancerProfile;
        } else if (user.role === 'admin') {
            delete filteredUser.freelancerProfile;
            delete filteredUser.clientProfile;
        }
        res.status(200).json(filteredUser);
    } catch (error) {
        res.status(500).json({ message: 'Error while getting user', error: error.message });
    }
}

export const getFreelancers = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (user.role !== 'freelancer') {
            return res.status(400).json({ message: 'User is not a freelancer' });
        }
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error while getting user', error: error.message });
    }
};


export const getClients = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.role !== 'client') {
            return res.status(400).json({ message: 'User is not a client' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error while getting user', error: error.message });
    }
};

export const updateFreelancerProfile = async (req, res) => {
    const { firstName, lastName, bio, freelancerProfile } = req.body;
    let parsedFreelancerProfile;

    try {
        parsedFreelancerProfile = typeof freelancerProfile === "string" ? JSON.parse(freelancerProfile) : freelancerProfile || {};
    } catch (error) {
        return res.status(400).json({ message: "Invalid freelancerProfile format" });
    }

    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role !== "freelancer") return res.status(403).json({ message: "You are not authorized to update freelancer profile" });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (bio) user.bio = bio;

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "profile_images",
                width: 500,
                height: 500,
                crop: "fill",
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            user.profile = result.secure_url;
        }

        if (!user.freelancerProfile) user.freelancerProfile = {};
        const fp = parsedFreelancerProfile;

        // Append logic for arrays
        const appendUnique = (existing = [], incoming = []) => {
            const set = new Set(existing);
            for (const item of incoming) {
                if (!set.has(item)) set.add(item);
            }
            return Array.from(set);
        };

        if (fp.skills && Array.isArray(fp.skills)) {
            user.freelancerProfile.skills = appendUnique(user.freelancerProfile.skills, fp.skills);
        }

        if (typeof fp.hourlyRate === 'number') {
            user.freelancerProfile.hourlyRate = fp.hourlyRate;
        }

        if (fp.availability && ["full-time", "part-time", "contract"].includes(fp.availability)) {
            user.freelancerProfile.availability = fp.availability;
        }

        if (fp.experience) {
            user.freelancerProfile.experience = fp.experience;
        }

        if (fp.education) {
            user.freelancerProfile.education = fp.education;
        }

        if (fp.languages && Array.isArray(fp.languages)) {
            user.freelancerProfile.languages = appendUnique(user.freelancerProfile.languages, fp.languages);
        }

        if (fp.portfolio && Array.isArray(fp.portfolio)) {
            user.freelancerProfile.portfolio = appendUnique(user.freelancerProfile.portfolio, fp.portfolio);
        }

        if (fp.banner) {
            const result = await cloudinary.v2.uploader.upload(fp.banner, {
                folder: "freelancer_banners",
                crop: "fill",
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            user.freelancerProfile.banner = result.secure_url;
        }

        await user.save();
        res.status(200).json({ message: "Freelancer profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error while updating freelancer profile", error: error.message });
    }
};


export const updateClientProfile = async (req, res) => {
    const { username, bio, clientProfile } = req.body;
    let parsedClientProfile;

    try {
        parsedClientProfile = typeof clientProfile === "string" ? JSON.parse(clientProfile) : clientProfile || {};
    } catch (error) {
        return res.status(400).json({ message: "Invalid clientProfile format" });
    }

    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role !== "client") return res.status(403).json({ message: "You are not authorized to update client profile" });
        if (username && username !== user.username) {
            const existing = await User.findOne({ username });
            if (existing) {
                return res.status(400).json({ message: "Username already taken" });
            }
            user.username = username;
        }
        if (bio) user.bio = bio;

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "profile_images",
                width: 500,
                height: 500,
                crop: "fill",
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            user.profile = result.secure_url;
        }

        if (!user.clientProfile) user.clientProfile = {};
        const cp = parsedClientProfile;

        if (cp.company) {
            user.clientProfile.company = cp.company;
        }

        if (cp.location) {
            user.clientProfile.location = cp.location;
        }
        if (cp.website) {
            user.clientProfile.website = cp.website;
        }
        if (cp.industry) {
            user.clientProfile.industry = cp.industry;
        }
        if (cp.phoneNumber) {
            user.clientProfile.phoneNumber = cp.phoneNumber;
        }
        await user.save();
        res.status(200).json({ message: "Client profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error while updating client profile", error: error.message });
    }
}


export const updateProfile = async (req, res) => {
    const { firstName, lastName, bio, freelancerProfile, clientProfile } = req.body;
    const { userId } = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.firstName = firstName;
        user.lastName = lastName;
        user.bio = bio;
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'profile_images',
                crop: 'fill',
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            user.profile = result.secure_url;
        }
        if (user.role === 'client' && freelancerProfile) {
            return res.status(403).json({ message: 'You are not authorized to update freelancer profile fields.' });
        } else if (user.role === 'freelancer' && clientProfile) {
            return res.status(403).json({ message: 'You are not authorized to update client profile fields.' });
        }
        if (user.role === 'freelancer' && freelancerProfile) {
            if (!user.freelancerProfile) {
                user.freelancerProfile = {}; // Ensure it exists
            }
            if (freelancerProfile.skills && Array.isArray(freelancerProfile.skills)) {
                user.freelancerProfile.skills = freelancerProfile.skills;
            } else if (!user.freelancerProfile.skills) {
                user.freelancerProfile.skills = []; // Default empty array if none exists
            }
            user.freelancerProfile.hourlyRate = freelancerProfile.hourlyRate || user.freelancerProfile.hourlyRate;
            if (freelancerProfile.availability && ['full-time', 'part-time', 'contract'].includes(freelancerProfile.availability)) {
                user.freelancerProfile.availability = freelancerProfile.availability;
            }
            user.freelancerProfile.experience = freelancerProfile.experience || user.freelancerProfile.experience;
            user.freelancerProfile.education = freelancerProfile.education || user.freelancerProfile.education;
            user.freelancerProfile.languages = freelancerProfile.languages || user.freelancerProfile.languages;
            user.freelancerProfile.portfolio = freelancerProfile.portfolio || user.freelancerProfile.portfolio;

            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'freelancer_banners',
                    crop: 'fill',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true
                });
                user.freelancerProfile.banner = result.secure_url;
            }
        } else if (user.role === 'client' && clientProfile) {
            user.clientProfile.company = clientProfile.company || user.clientProfile.company;
            user.clientProfile.location = clientProfile.location || user.clientProfile.location;
            user.clientProfile.website = clientProfile.website || user.clientProfile.website;
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error while updating profile', error: error.message });
    }
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordCorrect = bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid password' });
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while changing password', error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Invalid email' });
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        await sendResetPasswordEmail(email, resetToken);
        res.status(200).json({ message: 'Reset password email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while forgot password', error: error.message });
    }
}

export const sendOtpToEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Invalid email' });
        const otp = crypto.randomInt(100000, 999999).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        await user.save();
        await sendOtp(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while sending OTP', error: error.message });
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Invalid email' });
        if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
        if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while verifying OTP', error: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while resetting password', error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting user', error: error.message });
    }
}

export const googleOAuthLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;
        let user = await User.findOne({ googleId: uid });
        if (!user) {
            user = await User.findOne({ email });
            if (!user) {
                user = new User({
                    googleId: uid,
                    username: name,
                    email,
                });
            } else {
                user.googleId = uid;
            }
            await user.save();
        }
        user.traction.lastLogin = new Date();
        user.traction.loginsCount += 1;
        await user.save();
        const accessToken = generateAccessToken(user._id, user.role, user.tokenVersion);
        const refreshToken = generateRefreshToken(user._id);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Google OAuth login failed', error: error.message });
    }
}

export const facebookOAuthLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;
        let user = await User.findOne({ facebookId: uid });
        if (!user) {
            user = new User({
                facebookId: uid,
                username: name,
                email,
            });
            await user.save();
        }
        user.traction.lastLogin = new Date();
        user.traction.loginsCount += 1;
        await user.save();
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Facebook OAuth login failed', error: error.message });
    }
};

export const microsoftOAuthLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;
        let user = await User.findOne({ microsoftId: uid });
        if (!user) {
            user = new User({
                microsoftId: uid,
                username: name,
                email,
            });
            await user.save();
        }
        user.traction.lastLogin = new Date();
        user.traction.loginsCount += 1;
        await user.save();
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Microsoft OAuth login failed', error: error.message });
    }
};

export const getAllFreelancers = async (req, res) => {
    try {
        const freelancers = await User.find({ role: 'freelancer' });
        res.status(200).json(freelancers);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching freelancers', error: error.message });
    }
}


export const getClientProfile = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.role !== 'client') {
            return res.status(400).json({ message: 'User is not a client' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error while getting client profile', error: error.message });
    }
}

export const saveFreelancerProfile = async (req, res) => {
    const { userId } = req.user;
    const { freelancerId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.role !== 'client') {
            return res.status(403).json({ message: 'You are not authorized to save freelancer profiles' });
        }
        const savedProfile = new SavedProfiles({
            client: userId,
            freelancer: freelancerId
        });
        await savedProfile.save();
        res.status(201).json({ message: 'Freelancer profile saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while saving freelancer profile', error: error.message });
    }
}

export const getSavedProfiles = async (req, res) => {
    const { userId } = req.user;
    try {
        const savedProfiles = await SavedProfiles.find({ client: userId }).populate('freelancer');
        res.status(200).json(savedProfiles);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching saved profiles', error: error.message });
    }
};


export const unsaveFreelancerProfile = async (req, res) => {
    const { userId } = req.user;
    const { freelancerId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.role !== 'client') {
            return res.status(403).json({ message: 'You are not authorized to unsave freelancer profiles' });
        }
        await SavedProfiles.deleteOne({ client: userId, freelancer: freelancerId });
        res.status(200).json({ message: 'Freelancer profile unsaved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while unsaving freelancer profile', error: error.message });
    }
}

export const getClient = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.role !== 'client') {
            return res.status(400).json({ message: 'User is not a client' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error while getting client profile', error: error.message });
    }
}

export const updateUserStatus = async (req, res) => {
    const { userId } = req.params;
    const { userStatus } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!['active', 'suspended'].includes(userStatus)) {
            return res.status(400).json({ message: 'Invalid user status' });
        }
        if (userStatus === 'suspended') {
            user.isActive = false;
        } else if (userStatus === 'active') {
            user.isActive = true;
        }
        user.userStatus = userStatus;
        await user.save();
        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while updating user status', error: error.message });
    }
}

export const forceLogoutAll = async (req, res) => {
    try {
        await User.updateMany({}, { $inc: { tokenVersion: 1 } });
        // delete all refresh tokens from redis
        const keys = await client.keys("*");
        for (let key of keys) await client.del(key);
        return res.json({
            success: true,
            message: "All users have been logged out successfully."
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting user', error: error.message });
    }
}
import Review from "../models/Ratings.js";
import User from "../models/User.js";


export const createReview = async (req, res) => {
    try {
        const { reviewee, rating, comment, job, type } = req.body;
        const {userId} = req.user

        const existing = await Review.findOne({ reviewer: userId, reviewee, job });
        if (existing) {
            return res.status(400).json({ message: "Review already submitted for this job." });
        }

        const review = new Review({
            reviewer: userId,
            reviewee,
            rating,
            comment,
            job,
            type,
        });

        await review.save();
        
        const user = await User.findById(reviewee);
        let profilePath;
        if (type === 'client-to-freelancer') {
            profilePath = 'freelancerProfile';
            user.freelancerProfile?.reviews?.push(review._id);
        } else if (type === 'freelancer-to-client') {
            profilePath = 'clientProfile';
            user.clientProfile?.reviews?.push(review._id);
        }
        const total = user[profilePath].totalReviews || 0;
        const currentAvg = user[profilePath].avgRating || 0;

        const newTotal = total + 1;
        const newAvg = ((currentAvg * total) + rating) / newTotal;
        user[profilePath].avgRating = parseFloat(newAvg.toFixed(1));
        user[profilePath].totalReviews = newTotal;

        await user.save();

        res.status(201).json({ review, avgRating: user[profilePath].avgRating, totalReviews: user[profilePath].totalReviews });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({ reviewee: userId })
            .populate('reviewer', 'username profile')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

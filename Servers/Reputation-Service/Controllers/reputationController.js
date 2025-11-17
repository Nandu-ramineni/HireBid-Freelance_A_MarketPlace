import { validationResult } from "express-validator";
import Reputation from "../Models/reputationModel.js";


export const updateReputation = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: false, errors: errors.array()});
    }
    const {userId, rating, review, jobId} = req.body;
    try {
        let reputation =  await Reputation.findOne({userId});
        if(!reputation){
            reputation = new Reputation({
                userId
            });
        }
        const totalRatings = reputation.ratingsReceived + 1;
        const newReputationScore = (reputation.reputationScore * reputation.ratingsReceived + rating) / totalRatings;
        reputation.ratingsReceived = totalRatings;
        reputation.reputationScore = newReputationScore;
        reputation.reviews.push({jobId, rating, review});
        await reputation.save();
        res.status(200).json({success: true, reputation});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getReputation = async(req,res) => {
    const {userId} = req.params;
    try {
        const reputation = await Reputation.findOne({userId});
        if(!reputation){
            return res.status(404).json({success: false, message: 'Reputation not found'});
        }
        res.status(200).json({success: true, reputation});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
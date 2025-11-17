import Subscription from "../models/Subscription.js";
import { createRazorPayOrder } from "../services/razorpayService.js";

export const createSubscriptionIntent = async (req, res) => {
    const { userId } = req.user;
    const { plan, amount, currency } = req.body;
    try {
        const existingSubscription = await Subscription.findOne({ userId, status: 'active', plan });
        if (existingSubscription) {
            return res.status(400).json({ message: `You already have an active ${existingSubscription.plan} subscription` });
        }
        const newSubscription = new Subscription({
            userId,
            plan,
            price: amount,
            status: 'inactive',
            startDate: null,
            endDate: null
        });
        await newSubscription.save();

        const { orderId } = await createRazorPayOrder(amount, currency, userId, newSubscription._id);
        res.status(201).json({ message: 'Subscription created successfully', orderId, newSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subscription', error: error.message });
    }
}

export const cancelSubscription = async (req, res) => {
    const { userId } = req.user;
    const { subscriptionId } = req.body;

    try {
        const subscription = await Subscription.findOne({ _id: subscriptionId, userId });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        subscription.status = 'cancelled';
        await subscription.save();
        res.status(200).json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling subscription', error: error.message });
    }
}

export const getSubscriptionDetails = async (req, res) => {
    const { userId } = req.user;
    try {
        const subscription = await Subscription.find({ userId });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ subscription });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription details', error: error.message });
    }
}
export const getUserSubscriptions = async (req, res) => {
    const { userId } = req.user;
    try {
        const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 });

        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found' });
        }

        // Find the most recent active subscription
        const activeSub = subscriptions.find(sub => sub.status === 'active');

        res.status(200).json({
            activePlan: activeSub ? activeSub.plan : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
}

export const updateSubscription = async (req, res) => {
    const { userId } = req.user;
    const { subscriptionId, plan, amount, currency } = req.body;

    try {
        const subscription = await Subscription.findOne({ _id: subscriptionId, userId });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        subscription.plan = plan;
        subscription.price = amount;
        subscription.status = 'inactive';
        subscription.startDate = null;
        subscription.endDate = null;
        await subscription.save();
        const {orderId} = await createRazorPayOrder(amount, currency, userId, subscription._id);
        res.status(200).json({ message: 'Subscription updated successfully', orderId, subscription });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating subscription', error: error.message });
    }
}

export const getSubscriptionHistory = async (req, res) => {
    const { userId } = req.user;
    try {
        const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ subscriptions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription history', error: error.message });
    }
}


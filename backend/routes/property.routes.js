import {Router} from 'express';
import { createProperty,getProperties,getPropertyFromCity,findPropertyRange } from '../controllers/propery.controller.js';
import protect from '../middlewares/auth.middleware.js';
const propertyRouter = Router();


propertyRouter.post('/create',createProperty)
propertyRouter.get('/get',getProperties)
propertyRouter.post('/getPropertyFromCity',getPropertyFromCity); 
propertyRouter.post('/range',findPropertyRange);  

propertyRouter.get('/recommendations', async (req, res) => {
    const { city, minPrice, maxPrice } = req.query;

    try {
        const recommendations = await recommendPropertyWithTensorFlow(userId, city, parseFloat(minPrice), parseFloat(maxPrice));
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

propertyRouter.post('/history', protect,async (req, res) => {
    const { propertyId, action,userId,user } = req.body;
    console.log(user);
    // Validate inputs
    if (!userId || !propertyId || !action) {
        return res.status(400).json({ error: 'userId, propertyId, and action are required.' });
    }

    try {
        // Check if the action is valid
        if (!['viewed', 'booked'].includes(action)) {
            return res.status(400).json({ error: 'Invalid action type.' });
        }

        // Create and save the history record
        const historyRecord = new History({
            userId,
            propertyId,
            action
        });

        await historyRecord.save();

        res.status(201).json({ message: 'History record created successfully', historyRecord });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while saving history.' });
    }
});



export default propertyRouter;
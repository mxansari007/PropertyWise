import Property from '../models/property';
import { prepareTrainingData, trainRecommendationModel } from './trainModel';

// Recommend properties using trained TensorFlow model
export const recommendPropertyWithTensorFlow = async (userId, city, minPrice, maxPrice) => {
    // Fetch properties based on the city and price range
    const properties = await Property.find({
        city: city,
        pricePerNight: { $gte: minPrice, $lte: maxPrice }
    });

    // Get the history data for training
    const { userIds, propertyIds, ratings } = await prepareTrainingData();

    // Train the recommendation model
    const { model, userIdMap, propertyIdMap } = await trainRecommendationModel({ userIds, propertyIds, ratings });

    // Check if the current user exists in the trained data
    if (!userIdMap.has(userId)) {
        throw new Error('User not found in training data');
    }

    // Predict scores for the properties that haven't been interacted with by the user
    const predictions = [];
    for (let property of properties) {
        if (propertyIdMap.has(property._id.toString())) {
            const userIndex = userIdMap.get(userId);
            const propertyIndex = propertyIdMap.get(property._id.toString());

            // Predict the rating
            const prediction = model.predict([tf.tensor1d([userIndex]), tf.tensor1d([propertyIndex])]);
            const score = prediction.dataSync()[0]; // Get the predicted score

            predictions.push({ ...property._doc, recommendationScore: score });
        }
    }

    // Sort properties by the predicted recommendation score
    return predictions.sort((a, b) => b.recommendationScore - a.recommendationScore);
};

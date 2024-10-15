import History from '../models/history';
import tf from '@tensorflow/tfjs-node';

// Function to fetch historical data and prepare tensors
export const prepareTrainingData = async () => {
    // Fetch all history records (user-property interactions)
    const history = await History.find().populate('propertyId');

    // Create arrays for user IDs, property IDs, and ratings (based on interaction type)
    const userIds = [];
    const propertyIds = [];
    const ratings = [];

    history.forEach(record => {
        userIds.push(record.userId.toString());
        propertyIds.push(record.propertyId._id.toString());
        
        // Assign a rating based on the action type (this can be refined)
        const rating = record.action === 'booked' ? 5 : 3; // Booking is considered higher interest
        ratings.push(rating);
    });

    return { userIds, propertyIds, ratings };
};



// Create a TensorFlow collaborative filtering model
export const trainRecommendationModel = async ({ userIds, propertyIds, ratings }) => {
    // Convert string IDs to unique numerical indices
    const uniqueUsers = Array.from(new Set(userIds));
    const uniqueProperties = Array.from(new Set(propertyIds));
    
    const userIdMap = new Map(uniqueUsers.map((id, index) => [id, index]));
    const propertyIdMap = new Map(uniqueProperties.map((id, index) => [id, index]));

    // Map the user and property IDs to numerical indices
    const userTensor = tf.tensor1d(userIds.map(id => userIdMap.get(id)), 'int32');
    const propertyTensor = tf.tensor1d(propertyIds.map(id => propertyIdMap.get(id)), 'int32');
    const ratingTensor = tf.tensor1d(ratings, 'float32');

    // Create embedding layers for users and properties
    const userEmbedding = tf.layers.embedding({ inputDim: uniqueUsers.length, outputDim: 10 });
    const propertyEmbedding = tf.layers.embedding({ inputDim: uniqueProperties.length, outputDim: 10 });

    // Neural network layers for collaborative filtering
    const userInput = tf.input({ shape: [1] });
    const propertyInput = tf.input({ shape: [1] });

    const userVector = userEmbedding.apply(userInput);
    const propertyVector = propertyEmbedding.apply(propertyInput);

    const dotProduct = tf.layers.dot({ axes: -1 }).apply([userVector, propertyVector]);

    // Flatten and create a dense output layer for predictions
    const flattened = tf.layers.flatten().apply(dotProduct);
    const output = tf.layers.dense({ units: 1, activation: 'linear' }).apply(flattened);

    // Compile the model
    const model = tf.model({ inputs: [userInput, propertyInput], outputs: output });
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    // Train the model using the interaction data
    await model.fit([userTensor, propertyTensor], ratingTensor, {
        epochs: 10,
        batchSize: 32,
    });

    // Return the trained model and mappings
    return { model, userIdMap, propertyIdMap };
};

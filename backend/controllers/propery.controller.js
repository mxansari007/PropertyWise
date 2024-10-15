import Property from '../models/property.model.js'
import tf from '@tensorflow/tfjs-node'; // Import TensorFlow for Node.js

const createProperty = async (req, res) => {

    const { title, description, address, city, state, zipCode, country, pricePerNight, amenities, images } = req.body;

    try {
        const property = await Property.create({
            title,
            description,
            address,
            city,
            state,
            zipCode,
            country,
            pricePerNight,
            amenities,
            images,
        });

        return res.status(201).json(property);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}


const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        return res.status(200).json(properties);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}

const getPropertyFromCity = async (req, res) => {
    try {
      const { city } = req.body;
  
      // Search for city in a case-insensitive way using regex
      const data = await Property.find({ city: { $regex: new RegExp(city, "i") } });
  
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  };


  const findPropertyRange =async (req,res) =>{
    try{
        const {max,min} = req.body;

        const properties = await Property.find({
            pricePerNight:{ $gte: min, $lte: max }
        })

        res.status(200).json(properties);
    }catch(err){
        res.status(500).json({message:"error"})
    }
  }

// Helper function to generate a simple recommendation system
const recommendProperty = async (city, minPrice, maxPrice) => {
    // Fetch Property based on city and price range
    const Property = await Property.find({
      city: city,
      price: { $gte: minPrice, $lte: maxPrice }
    });
  
    // Collect ratings to simulate a collaborative filtering process (you can improve this part)
    const prices = Property.map(rental => Property.price);
    const ratings = Property.map(rental => Property.rating);
  
    // Normalize prices (Min-Max scaling)
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const normalizedPrices = prices.map(price => (price - min) / (max - min));
  
    // Create a TensorFlow tensor for the recommendation logic (basic here)
    const priceTensor = tf.tensor(normalizedPrices);
    const ratingTensor = tf.tensor(ratings);
  
    // Multiply price and rating (simple weight-based recommendation)
    const recommendationScore = priceTensor.mul(ratingTensor);
  
    const scores = await recommendationScore.data(); // Get recommendation scores
  
    // Attach recommendation scores to the Property
    Property.forEach((rental, index) => {
      Property._doc.recommendationScore = scores[index];
    });
  
    return Property.sort((a, b) => b._doc.recommendationScore - a._doc.recommendationScore);
  };




const recommend =  async (req, res) => {
    const city = req.query.city;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  
    try {
      const recommendedProperty = await recommendProperty(city, minPrice, maxPrice);
      res.json(recommendedProperty);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };



export { createProperty,getProperties,getPropertyFromCity,findPropertyRange,recommend }
import Property from '../models/property.model.js'


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
  



export { createProperty,getProperties,getPropertyFromCity }
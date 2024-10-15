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



export { createProperty,getProperties }
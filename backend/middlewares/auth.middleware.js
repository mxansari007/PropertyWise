import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protect = async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Decode the token using JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user details without the password
            req.user = await User.findById(decoded.id).select('-password');

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            // Proceed to the next middleware
            next();
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        // If no token found in the headers
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;

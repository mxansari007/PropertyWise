import User from '../models/user.model.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.getSignedToken(),
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User
            .findOne({ email })
            .select("+password");
            
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        const token = user.getSignedToken();

        // Set cookie options
        const options = {
            httpOnly: true, // Accessible only by web server
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expiration time
            sameSite: 'Lax',
            secure: false, // Set to true in production
        };

        // Send token in a cookie
        return res.cookie("token", token, options).status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });

    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}


export const logout = async (req, res) => {
    try {
        // Clear cookie
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out" });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}

export const getProfile = async (req, res) => {
    return res.status(200).json(req.user);
}
# Propertywise
Propertywise is a home rental application designed to connect property owners with potential renters. The platform allows users to search for rental properties, view detailed listings, and make bookings.

# Features
- Property Listings: View detailed information about various rental properties.
- Search Filters: Filter properties based on location, price, and amenities.
- Property Management: Property owners can add, update, or delete listings.
- User Authentication: Secure user login and registration for renters and property owners.
- Recommendation System: Personalized recommendations for users based on preferences using TensorFlow.
- Booking System: Seamless booking process for renters to secure their desired property.
- Real-time Availability: Check property availability in real-time.

# Tech Stack
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB (with Mongoose)
- Machine Learning: TensorFlow for the recommendation system
- Other Libraries:
-  bcrypt.js for password hashing
-  JWT for user authentication
-  Multer for file uploads (images)

# Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/propertywise.git
```
2. Navigate to the project directory:
```bash
cd Propertywise
```
3. Install Dependencies

```bash
npm install
```
4. start developement
```bash
npm run dev
```

# Database Schema 

```js
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, {
    timestamps: true,
});
```


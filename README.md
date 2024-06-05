Description
This project is the backend server for the e-commerce website built with React. It is developed using Node.js, Express, and MongoDB. The backend handles CRUD (Create, Read, Update, Delete) operations for products and stores user information securely.

Implemented Features
- CRUD Operations: Implement Create, Read, Update, and Delete operations for products.
- User Authentication: Securely handle user authentication and store user information.
- Middleware: Implement middleware for authentication, error handling, and other functionalities.

Setup
To set up and run this backend server locally, follow these steps:

1. Clone the repository: 
   git clone <repository_url>

2. Navigate to the backend directory:
   cd <backend_directory>

3. Install dependencies:
   npm install

4. Set up MongoDB:
   - Install MongoDB if not already installed on your system.
   - Start the MongoDB service.

5. Configure Environment Variables:
   - Create a .env file in the backend directory.
   - Define the following environment variables:
     - PORT: Port number for the server.
     - MONGODB_URI: MongoDB connection URI.

Running the Server
After completing the setup steps, you can run the backend server locally by executing the following command:

npm start

The server will start running on the specified port, and it will be ready to handle requests from the frontend.

API Endpoints
- GET /products: Retrieve all products.
- POST /products: Create a new product.
- GET /products/:id: Retrieve a specific product by ID.
- PUT /products/:id: Update a specific product by ID.
- DELETE /products/:id: Delete a specific product by ID.
- POST /register: Register a new user.
- POST /login: Authenticate user login.

Additional Notes
- Ensure you have Node.js and npm installed on your system.
- Make sure MongoDB is running and accessible.

# Node.js Backend with Express, Mongoose, and MongoDB

This repository contains a Node.js backend application built with Express, Mongoose, and MongoDB. It provides a CRUD (Create, Read, Update, Delete) RESTful API for managing products, along with a refresh token rotation mechanism for enhanced security.

## Features

- CRUD operations for products: create, read, update, delete.
- RESTful API endpoints for managing products.
- Integration with MongoDB using Mongoose for data storage.
- Refresh token rotation for enhanced security.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- MongoDB (Make sure MongoDB is running on your system)

## Getting Started

To get started with the application, follow the steps below:

1. Clone this repository to your local machine or download the source code as a ZIP file.
2. Navigate to the project directory using the command line or terminal.
3. Install the dependencies by running the following command:

   ```
   npm install
   ```

4. Set the required environment variables in `.env` file in the project root directory.

5. Run the seeder to populate the database with sample data. Execute the following command:

   ```
   npm run seeder
   ```

6. Start the application in development mode by running the following command:

   ```
   npm run dev
   ```

   This command will start the server and listen on the default port (usually 3000).

7. You should see a message indicating that the server is running successfully. Now you can make requests to the API endpoints using tools like Postman or cURL.



## Refresh Token Rotation

This backend application implements a refresh token rotation mechanism for enhanced security. When a user logs in, they receive an access token and a refresh token. The access token has a shorter expiration time, while the refresh token has a longer expiration time.

To rotate the refresh token, the client sends both the access token and the refresh token with each request. The server verifies the access token and, if valid, generates a new pair of tokens (access token and refresh token). The new tokens are sent back to the client, allowing it to continue making requests.

By rotating the refresh token, the application reduces the risk associated with long-lived refresh tokens and improves security.

Sure! Here's an example `.env` file with the provided environment variables:

## Environment Config Example
```
MONGO_URL=mongodb://localhost:27017/nazadv # Using local DB connection
JWT_SECRET_ACCESS_TOKEN=YOUR SECRET KEY
JWT_SECRET_ACCESS_TOKEN_TIME=1000s
JWT_SECRET_REFRESH_TOKEN=YOUR SECRET KEY
JWT_SECRET_REFRESH_TOKEN_TIME=10000s
JWT_COOKIE_EXPIRY_TIME=10000 # Values are in seconds
```

Make sure to replace the values with your own configurations as needed.

Let me know if there's anything else I can help you with!

## Conclusion

This Node.js backend application provides a CRUD RESTful API for managing products, along with a refresh token rotation mechanism for enhanced security. It leverages Express as the web framework, Mongoose as the MongoDB object modeling tool, and integrates with MongoDB for data storage.

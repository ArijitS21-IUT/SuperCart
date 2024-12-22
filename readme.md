# SuperCart 🛒  
An online grocery app built with the MERN stack and Fastify, designed to deliver a seamless shopping experience for users.

## Table of Contents  
- [About the Project](#about-the-project)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)    
 
  

## About the Project  
SuperCart simplifies grocery shopping by providing an intuitive platform where users can browse, add items to a cart, and place orders conveniently. This project is built to enhance scalability and speed using the MERN stack and Fastify.

## Features  
- User authentication and authorization.  
- Product listing with search and filter functionality.  
- Shopping cart and order management.  
- Real-time inventory updates.  
- Responsive and user-friendly design (frontend development in progress).  

## Tech Stack  
- **Frontend**: HTML, CSS, JavaScript, React, Bootstrap (to be implemented).  
- **Backend**: Node.js, Fastify, Express.js.  
- **Database**: MongoDB.  
- **State Management**: Redux (to be integrated).  
- **Deployment**: To be determined.  

## Installation  

### Prerequisites  
- Node.js   
- MongoDB (local or cloud)  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/SuperCart.git  
   cd SuperCart  
   ```  
2. Install dependencies for the backend:  
   ```bash  
   cd server  
   npm install  
   ```  
3. Set up the environment variables:  
   - Create a `.env` file in the `server` directory.  
   - Add the following variables:  
     ```env  
     MONGO_URI=your-mongodb-uri  
     COOKIE_PASSWORD= your-cookie-password
     ACCESS_TOKEN_SECRET= your-Access-Token
     REFRESH_TOKEN_SECRET= your-Refresh-Token
     ```  
4. Start the backend server:  
   ```bash  
   npm start  
   ```  
5. (Frontend instructions will follow upon completion of backend development.)  

## Usage  
- Backend runs on `http://localhost:4000` by default.  
- API documentation can be accessed via `/docs` (Fastify Swagger plugin enabled).

## API Endpoints  
| Method | Endpoint          | Description                |  
|--------|-------------------|----------------------------|  
| GET    | /api/products     | Fetch all products         |  
| POST   | /api/users/signup | User registration          |  
| POST   | /api/users/login  | User login                 |  
| GET    | /api/cart         | Fetch user cart items      |  
| POST   | /api/orders       | Place an order             |  

_(More endpoints will be added as features are implemented.)_   

 


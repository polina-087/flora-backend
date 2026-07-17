# Flora API Service

This repository contains the backend architecture for the Flora flower shop. It is a fully functional RESTful API built using Node.js, Express, and PostgreSQL (via Sequelize ORM). The project includes request data validation, image upload handling, and interactive OpenAPI documentation.

Serves as the backend for the [Flora Client App](https://polina-087.github.io/UMT-markup-practice-ZhuravlovaPolina/)

## 🚀 Tech Stack

- **Runtime:** Node.js 22 (ES Modules)
- **Framework:** Express 4
- **Database & ORM:** PostgreSQL (`pg` driver) + Sequelize 6
- **Validation:** Joi
- **File Uploads:** Multer (with Gravatar fallback for empty images)
- **Documentation:** Swagger (`swagger-jsdoc` & `swagger-ui-express`)

## 📁 Directory Structure

```text
server.js            # App entry point, establishes DB connection and starts the server
app.js               # Express setup: CORS, JSON parsing, static files, routing, error handling
db/sequelize.js      # DB connection instance and configuration
models/              # Sequelize data models (Bouquet, Feedback, Order)
routes/              # API endpoints and Swagger route annotations
controllers/         # Request handlers (extracts data and sends responses)
services/            # Core business logic and database operations
schemas/             # Joi validation schemas for incoming requests
middlewares/         # Custom middleware (body validation, ID checking, Multer setup)
helpers/             # Utility functions (error wrappers, custom error classes)
docs/swaggerDef.js   # OpenAPI configuration and reusable component schemas
seed/                # Database seeding scripts and initial JSON data
temp/                # Temporary directory for Multer file uploads
public/photos/       # Public directory serving uploaded images
```

## 🌐 API Endpoints

**Base Path:** `/api`

| Verb | Route | Action Description |
|---|---|---|
| **GET** | `/api/bouquets` | Retrieve a list of bouquets. Supports query params: `?page`, `?limit`, `?category`, `?favorite` |
| **GET** | `/api/bouquets/:id` | Fetch a single bouquet by its ID |
| **POST** | `/api/bouquets` | Add a new bouquet (Joi-validated; generates a Gravatar `photoURL` if missing) |
| **PUT** | `/api/bouquets/:id` | Update an existing bouquet (requires at least one field) |
| **DELETE** | `/api/bouquets/:id` | Remove a bouquet from the database |
| **PATCH** | `/api/bouquets/:id/favorite` | Toggle the favorite status of a bouquet |
| **PATCH** | `/api/bouquets/:id/photo` | Upload a new bouquet image (`multipart/form-data`) |
| **POST** | `/api/orders` | Create a new customer order |
| **GET** | `/api/feedbacks` | Retrieve all customer feedbacks |
| **GET** | `/api/feedbacks/:id` | Fetch a single feedback by its ID |
| **POST** | `/api/feedbacks` | Add a new customer feedback |
| **PUT** | `/api/feedbacks/:id` | Update an existing feedback |
| **DELETE** | `/api/feedbacks/:id` | Remove a feedback from the database |
| **GET** | `/api-docs` | Open the interactive Swagger UI documentation |

## ⚙️ Environment Setup

Create a `.env` file in the root directory by copying the provided `.env.example` template:

```env
# Application port
PORT=3000

# PostgreSQL connection string
DATABASE_URL=postgres://your_username:your_password@localhost:5432/flora_db

# SSL requirement (set to true for cloud deployments like Render)
DB_SSL=false

# CORS policy (set to your frontend URL in production)
CORS_ORIGIN=*
```

## 💻 Running Locally

1. Install project dependencies:
   ```bash
   npm install
   ```
2. Populate the database with initial seed data:
   ```bash
   npm run seed
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the API documentation at: `http://localhost:3000/api-docs`

## ☁️ Deployment Guide (Render)

This application is ready to be deployed to Render using a managed PostgreSQL instance.

1. Push your code to a GitHub repository.
2. In Render dashboard, select **New → Web Service** and connect your repository.
3. Use the following settings:
   - **Build Command:** `npm ci`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Configure your **Environment Variables**:
   - `DATABASE_URL` → Paste the Internal Database URL from your Render PostgreSQL instance.
   - `DB_SSL` → `true`
   - `CORS_ORIGIN` → `https://your-github-username.github.io`
5. To run the seed script on the production database, execute this command locally using your External Database URL:
   ```bash
   DATABASE_URL="<your-external-db-url>" DB_SSL=true npm run seed
   ```

*Note: Render's free tier web services spin down after 15 minutes of inactivity. The first request after a period of inactivity may experience a cold start delay of up to 50 seconds.*

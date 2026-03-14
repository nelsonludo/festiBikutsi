# Festibikutsi Festival 2026 - Official Website

This is a full-stack web application for the Festibikutsi Festival 2026 edition.

## Project Structure

- `/client`: Frontend built with React, TypeScript, and Tailwind CSS.
- `/server`: Backend built with Node.js, Express, and MongoDB.

## How to Run Locally

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas URI.

### 2. Backend Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your connection string (optional, defaults to local):
   ```env
   MONGODB_URI=mongodb://localhost:27017/festibikutsi
   PORT=5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Lucide-react, i18next.
- **Backend**: Node.js, Express, Mongoose, Zod.
- **Database**: MongoDB.

// utils/db.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;

export async function connectDB() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  });

  cachedClient = client;

  return client;
}

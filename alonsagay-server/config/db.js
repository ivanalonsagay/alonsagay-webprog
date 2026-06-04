const mongoose = require('mongoose');
const dns = require('dns');

mongoose.set('bufferCommands', false);

dns.setDefaultResultOrder('ipv4first');

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  console.warn('Warning: Could not set custom DNS servers:', err.message);
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('CRITICAL ERROR: MONGO_URI is not defined in environment variables!');
  }

  if (cached.conn) {
    console.log('MongoDB: reusing existing connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        family: 4,
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 8000,
        connectTimeoutMS: 5000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        cached.promise = null;
        console.error(`MongoDB Connection Error: ${err.message}`);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
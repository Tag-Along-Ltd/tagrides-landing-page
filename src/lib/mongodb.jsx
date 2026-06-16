import { MongoClient } from 'mongodb';

let clientPromise;

if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  clientPromise = Promise.reject(
    new Error('MONGODB_URI is not set — add it to .env.local before calling the posts API.'),
  );
  clientPromise.catch(() => {});
}

export default clientPromise;

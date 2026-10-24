import { MongoClient } from 'mongodb';

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};
let mongoClientPromise: Promise<MongoClient> | undefined;

export async function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (globalForMongo.mongoClientPromise) {
    return globalForMongo.mongoClientPromise;
  }

  if (!mongoClientPromise) {
    // Drop a failed connection so the next request retries instead of reusing the rejection.
    const connecting = new MongoClient(uri).connect().catch((error) => {
      if (mongoClientPromise === connecting) mongoClientPromise = undefined;
      if (globalForMongo.mongoClientPromise === connecting) {
        globalForMongo.mongoClientPromise = undefined;
      }
      throw error;
    });
    mongoClientPromise = connecting;
  }

  if (process.env.NODE_ENV !== 'production') {
    globalForMongo.mongoClientPromise = mongoClientPromise;
  }

  return mongoClientPromise;
}

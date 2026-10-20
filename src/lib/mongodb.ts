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

  mongoClientPromise ??= new MongoClient(uri).connect();

  if (process.env.NODE_ENV !== 'production') {
    globalForMongo.mongoClientPromise = mongoClientPromise;
  }

  return mongoClientPromise;
}

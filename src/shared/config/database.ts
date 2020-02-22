import { Db, MongoClient } from 'mongodb';
import { logger } from '../Logger';
import { config } from './config';

let mongoClientInstance: MongoClient;

export const getMongoClientInstance = async (): Promise<Db> => {
  if (!mongoClientInstance || !mongoClientInstance.isConnected()) {
    logger.debug(`Connecting to MongoDB on ${config.mongo.MONGO_URL}...`);
    mongoClientInstance = await MongoClient.connect(config.mongo.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  return mongoClientInstance.db();
};

export const closeMongoClientInstance = () => {
  try {
    logger.debug('Closing connection to MongoDB...');
    mongoClientInstance.close();
    logger.info('Disconnected from MongoDB');
  } catch (err) {
    logger.crit(`Error closing connection to MongoDB: ${err}`);
  }
};

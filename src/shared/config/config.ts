interface IConfig {
  LOG_LEVEL: string;
  NODE_ENV: string;
  PORT: number;
  USE_MOCK_DB: boolean;
  mongo: {
    USER_COLLECTION: string;
    CODES_COLLECTION: string;
    MONGO_URL: string;
  };
}

export const config: IConfig = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NODE_ENV: process.env.NODE_ENV!,
  PORT: Number(process.env.APP_PORT) || 3050,
  USE_MOCK_DB: Boolean(process.env.USE_MOCK_DB) || false,
  mongo: {
    USER_COLLECTION: process.env.USER_MONGO_COLLECTION || '',
    CODES_COLLECTION: process.env.CODES_MONGO_COLLECTION || '',
    MONGO_URL: process.env.MONGO_URL || ''
  }
};

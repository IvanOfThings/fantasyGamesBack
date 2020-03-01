export interface IConfig {
  LOG_LEVEL: string;
  NODE_ENV: string;
  PORT: number;
  USE_MOCK_DB: boolean;
  telegram: {
    T_TOKEN: string;
    T_USER: string;
    T_NAME: string;
    CHATID: string;
  };
  mongo: {
    TIME_COLLECTION: string;
    USER_COLLECTION: string;
    CODES_COLLECTION: string;
    MONGO_URL: string;
  };
}

export const config: IConfig = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: Number(process.env.APP_PORT) || 3050,
  USE_MOCK_DB: Boolean(process.env.USE_MOCK_DB) || false,
  NODE_ENV: process.env.NODE_ENV!,
  telegram: {
    CHATID: process.env.CHATID!,
    T_USER: process.env.T_USER!,
    T_NAME: process.env.T_NAME!,
    T_TOKEN: process.env.T_TOKEN!
  },
  mongo: {
    TIME_COLLECTION: process.env.TIME_MONGO_COLLECTION || 'TimeMachine',
    USER_COLLECTION: process.env.USER_MONGO_COLLECTION || 'users',
    CODES_COLLECTION: process.env.CODES_MONGO_COLLECTION || 'codes',
    MONGO_URL: process.env.MONGO_URL || ''
  }
};

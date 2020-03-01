import cookieParser from 'cookie-parser';
import { buildFederatedSchema } from '@apollo/federation';
import { GraphQLResolverMap } from 'apollo-graphql';
import express from 'express';
import { Db, MongoClient } from 'mongodb';
import { ApolloServer } from 'apollo-server-express';
import { getMongoClientInstance } from './shared/config/database';
import { Request, Response } from 'express';
// logger from 'morgan';
import path from 'path';
import { typeDefs, resolvers } from './graphql';
import { logger } from '@shared';
import { config, IConfig } from '@config';
import TelegramBot from 'node-telegram-bot-api';

const locationCodes: Map<string, string> = new Map();
locationCodes.set('asdfsd32t4', 'Carcel Interdimensional');
locationCodes.set('a54df235r4', 'Agujero de los bandoleros');
locationCodes.set('b54dsd25u4', 'Agujero de los rufianes');
locationCodes.set('3534456lp4', 'Piso franco');

export interface IContext {
  db: Db;
  config: IConfig;
  bot: TelegramBot | null;
  gameID: string;
  locations: Map<string, string>;
}

export async function init() {
  logger.info(config.mongo.MONGO_URL);
  try {
    const db: Db = await getMongoClientInstance();

    // Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
    const token = config.telegram.T_TOKEN;

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, { polling: true });

    /*
    bot.onText(/^\/chatid/, msg => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'El id de este chat es: ' + chatId);
    });
  */
    const expressApp = express();

    const server = new ApolloServer({
      schema: buildFederatedSchema([
        {
          typeDefs,
          resolvers: resolvers as GraphQLResolverMap<any>
        }
      ]),
      context: ({ req, res }): IContext => {
        return {
          db,
          config,
          bot,
          gameID: '1',
          locations: locationCodes
        };
      }
    });

    server.applyMiddleware({
      app: expressApp,
      path: '/graphql'
    });

    // Start the server
    const port = Number(process.env.PORT || 3000);
    expressApp.listen(port, () => {
      logger.info('Express server started on port: ' + port);
    });
  } catch (error) {
    logger.crit('Critical error');
    logger.crit(error);
  }

  // Add middleware/settings/routes to express.
  // app.use(logger('dev'));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  // app.use(cookieParser());
  // app.use('/api', BaseRouter);

  /**
   * Point express to the 'views' directory. If you're using a
   * single-page-application framework like react or angular
   * which has its own development server, you might want to
   * configure this to only serve the index file while in
   * production mode.
   */
  // const viewsDir = path.join(__dirname, 'views');
  // app.set('views', viewsDir);
  // const staticDir = path.join(__dirname, 'public');
  // app.use(express.static(staticDir));
  // app.get('*', (req: Request, res: Response) => {
  //   res.sendFile('index.html', { root: viewsDir });
  // });

  // Export express instance
}

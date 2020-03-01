import * as TimeMachineDao from '../../daos/TimeMachine/TimeMachineDao';
import { IInputUser } from '@entities';
import { IResolverObject } from 'graphql-tools';
import { IResolvers } from 'graphql-tools';
import { IContext } from '../../Server';

export const telegramBotResolver: IResolvers = {
  Query: {
    getGameStatus: (parent: any, _, { gameID, db, config, bot }: IContext) => {
      return TimeMachineDao.getGameStatus(gameID, db, config);
    }
  },
  Mutation: {
    send: (parent: any, { msg }, { gameID, db, config, bot }: IContext) => {
      if (bot) {
        bot.sendMessage(config.telegram.CHATID, msg);
      }
      return 'OK';
    },
    start: async (parent: any, _, { db, gameID, config, bot }: IContext) => {
      try {
        await TimeMachineDao.start(gameID, db, config, bot);
        return 'OK';
      } catch (err) {
        return err;
      }
    },
    stop: async (
      parent: any,
      { stopCode },
      { db, gameID, config, bot }: IContext
    ) => {
      try {
        const status = await TimeMachineDao.stop(
          stopCode,
          gameID,
          db,
          config,
          bot
        );
        return { result: 'OK', nextSequenceCode: status?.nextSequenceCode };
      } catch (err) {
        return { result: 'error', error: err };
      }
    }
  }
};

/*

export const userResolver: IResolverObject = {
  Query: {
    User(parent: any, { id }: any, { db }: IContext) {
      return UserDao.getUser(id, db);
    },
    Users(parent: any, params: any, { db }: IContext) {
      return UserDao.getAllUsers(db);
    }
  },
  Mutation: {
    setMemoryLevel(parent: any, { id, level }: any, { db }: IContext) {
      return UserDao.setMemoryLevel(id, level, db);
    },
    setNewMemory(parent: any, { id, memory }: any, { db }: IContext) {
      return UserDao.setNewMemory(id, memory, db);
    }
  }
};
*/

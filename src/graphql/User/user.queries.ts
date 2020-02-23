import * as UserDao from '../../daos/User/UserDao';
import { IInputUser } from '@entities';
import { IResolverObject } from 'graphql-tools';
import { IResolvers } from 'graphql-tools';
import { IContext } from '../../Server';

export const userResolver: IResolvers = {
  Query: {
    User: (parent: any, { id }: any, { db }: IContext) => {
      return UserDao.getUser(id, db);
    },
    Users: (parent: any, params: any, { db }: IContext) => {
      return UserDao.getAllUsers(db);
    }
  },
  Mutation: {
    insertMemories: (parent: any, { id, memories }, { db }: IContext) => {
      return UserDao.insertMemories({ id, memories }, db);
    },
    newUser: (parent: any, params, { db }: IContext) => {
      return UserDao.newUser(params.user, db);
    },
    setMemoryLevel: (parent: any, { id, level }: any, { db }: IContext) => {
      return UserDao.setMemoryLevel(id, level, db);
    },
    setNewMemory: (parent: any, { id, memory }: any, { db }: IContext) => {
      return UserDao.setNewMemory(id, memory, db);
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

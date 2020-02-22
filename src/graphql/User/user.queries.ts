import { UserDao } from '@daos';
import { IResolverObject } from 'graphql-tools';
import { IResolvers } from 'graphql-tools';
import { IContext } from '../../Server';

export const userResolver: IResolvers = {
  Query: {
    User: (parent: any, { id }: any, { db }: IContext): IResolverObject => {
      return UserDao.getUser(id, db);
    },
    Users: (parent: any, params: any, { db }: IContext): IResolverObject => {
      return UserDao.getAllUsers(db);
    }
  },
  Mutation: {
    setMemoryLevel: (
      parent: any,
      { id, level }: any,
      { db }: IContext
    ): IResolverObject => {
      return UserDao.setMemoryLevel(id, level, db);
    },
    setNewMemory: (
      parent: any,
      { id, memory }: any,
      { db }: IContext
    ): IResolverObject => {
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

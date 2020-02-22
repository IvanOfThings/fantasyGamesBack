import { CodeDao } from '@daos';
import { IResolverObject } from 'graphql-tools';
import { IResolvers } from 'graphql-tools';
import { IContext } from '../../Server';

export const codeResolver: IResolvers = {
  Mutation: {
    useCode: (
      parent: any,
      { code, userId }: any,
      { db }: IContext
    ): IResolverObject => {
      return CodeDao.useCode(code, userId, db);
    }
  }
};

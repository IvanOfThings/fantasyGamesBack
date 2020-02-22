import { gql, IResolvers } from 'apollo-server';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { codeResolver, codeTypeDefs } from './Code';
import { userResolver, userTypeDefs } from './User';
/*
export const mergedResolvers: IResolvers = {
  ...userResolver.Query,
  ...codeResolver.Mutation,
  ...userResolver.Mutation
};*/

export const resolvers = mergeResolvers([
  { Query: userResolver.Query },
  {
    Mutation: {
      ...(userResolver.Mutation as IResolvers),
      ...(codeResolver.Mutation as IResolvers)
    }
  }
]);

export const typeDefs = gql`
  ${mergeTypes([userTypeDefs, codeTypeDefs])}
`;

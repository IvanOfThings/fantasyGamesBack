import { gql, IResolvers } from 'apollo-server';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { codeResolver, codeTypeDefs } from './Code';
import { userResolver, userTypeDefs } from './User';
import { telegramBotResolver, telegramBotTypeDefs } from './TelegramBot';
/*
export const mergedResolvers: IResolvers = {
  ...userResolver.Query,
  ...codeResolver.Mutation,
  ...userResolver.Mutation
};*/

export const resolvers = mergeResolvers([
  userResolver,
  codeResolver,
  telegramBotResolver
]);

export const typeDefs = gql`
  ${mergeTypes([userTypeDefs, codeTypeDefs, telegramBotTypeDefs])}
`;

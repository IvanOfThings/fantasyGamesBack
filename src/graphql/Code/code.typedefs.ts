import { gql } from 'apollo-server-core';

export const codeTypeDefs = gql`
  type Mutation {
    useCode(code: ID, userId: ID): Memory
  }

  type Code {
    code: ID!
    used: Boolean
  }
`;

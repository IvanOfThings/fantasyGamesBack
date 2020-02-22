import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type Query {
    User(id: ID): User
    Users: [User]
  }

  type Memory {
    id: ID!
    levelBlock: Int
    title: String
    details: String
  }

  type Mutation {
    setMemoryLevel(id: ID, level: Int): User
    setNewMemory(id: ID, level: Int): User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
    memoryLevel: Int
    memories: [Memory]!
  }
`;

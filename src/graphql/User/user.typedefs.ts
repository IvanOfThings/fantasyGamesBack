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

  input MemoryInput {
    id: ID!
    levelBlock: Int
    title: String
    details: String
  }

  type Mutation {
    insertMemories(id: ID, memories: [MemoryInput]): User
    newUser(user: UserInput): User
    setMemoryLevel(id: ID, level: Int): User
    setNewMemory(id: ID, level: Int): User
    setNewLocation(id: ID, location: String): User
  }

  input UserInput {
    id: ID!
    name: String
    email: String
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
    memoryLevel: Int
    memories: [Memory]!
    transported: String
  }
`;

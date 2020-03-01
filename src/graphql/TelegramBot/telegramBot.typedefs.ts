import { gql } from 'apollo-server-core';

export const telegramBotTypeDefs = gql`
  type Query {
    getGameStatus: GameStatus
  }
  type Mutation {
    send(msg: String): GameStatus
    start: String
    stop(stopCode: String): StopResult
  }

  type StopResult {
    result: String
    error: String
    nextSequenceCode: String
  }

  type GameStatus @key(fields: "gameID") {
    gameID: ID!
    gametime: Int
    events: Int
    startTime: Float
    finished: Boolean
    nextEvent: Int
    nextSequenceCode: String
    countDownStopped: Boolean
  }

  # type Memory {
  #   id: ID!
  #   levelBlock: Int
  #   title: String
  #   details: String
  # }

  # input MemoryInput {
  #   id: ID!
  #   levelBlock: Int
  #   title: String
  #   details: String
  # }

  # type Mutation {
  #   insertMemories(id: ID, memories: [MemoryInput]): User
  #   newUser(user: UserInput): User
  #   setMemoryLevel(id: ID, level: Int): User
  #   setNewMemory(id: ID, level: Int): User
  # }

  # input UserInput {
  #   id: ID!
  #   name: String
  #   email: String
  # }

  # type User @key(fields: "id") {
  #   id: ID!
  #   name: String
  #   email: String
  #   memoryLevel: Int
  #   memories: [Memory]!
  # }
`;

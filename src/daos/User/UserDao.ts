import { IUser, User, IMemory } from '@entities';
import { Db } from 'mongodb';
import { config } from '../../shared/config/config';

/**
 * Gets the user on the databasese with the memorylevel up to its memories
 * @param id user Id to get
 * @param db Databases
 */
export const getUser = async (id: string, db: Db): Promise<IUser | null> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  const user: IUser | null = await mongodb.findOne({ id });
  const history = user?.memories.filter(value => {
    if (value.levelBlock <= user.memoryLevel) return value;
  });
  return {
    ...user,
    memories: history
  } as IUser;
};

/**
 * Gets all the users in the databases
 * @param db Databases
 */
export const getAllUsers = async (db: Db): Promise<IUser[]> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  const usersCursor = await mongodb.find();
  const users: IUser[] = await usersCursor.toArray();
  return users;
};

/**
 * Sets the new memory level to the user
 * @param id user Id to update
 * @param level memory level to set to the user
 * @param db Databases
 */
export const setMemoryLevel = async (
  id: string,
  level: number,
  db: Db
): Promise<IUser | null> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  await mongodb.updateOne({ id }, { $set: { memoryLevel: level } });
  const user: IUser | null = await mongodb.findOne({ id });
  const history = user?.memories.filter(value => {
    if (value.levelBlock <= user.memoryLevel) return value;
  });
  return {
    ...user,
    memories: history
  } as IUser;
};

/**
 * Inserts a new memory to the user
 * @param id user Id to update
 * @param memory new memory to insert
 * @param db Databases
 */
export const setNewMemory = async (
  id: string,
  memory: IMemory,
  db: Db
): Promise<IUser | null> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  await mongodb.updateOne({ id }, { $push: { memories: memory } });
  const user: IUser | null = await mongodb.findOne({ id });
  const history = user?.memories.filter(value => {
    if (value.levelBlock <= user.memoryLevel) return value;
  });
  return {
    ...user,
    memories: history
  } as IUser;
};

/*
  public async add(user: IUser): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param user
   */
/*
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }*/

/*
  public async update(user: IUser): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
/*
  /**
   *
   * @param user
   */

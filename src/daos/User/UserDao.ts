import { config } from '@config';
import { IInputUser, IMemory, IUser } from '@entities';
import { Db } from 'mongodb';

/**
 * Allows to create a new user
 * @param id user to insert the memories on
 * @param memories memories to insert
 * @param db Databases
 */
export const insertMemories = async (
  { id, memories }: { id: string; memories: IMemory[] },
  db: Db
): Promise<IUser | null> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  const result = await mongodb.updateOne(
    { id },
    {
      $set: {
        memories
      }
    },
    { upsert: false }
  );
  const newUser = await mongodb.findOne({
    id
  });
  return { ...newUser } as IUser;
};

/**
 * Allows to create a new user
 * @param user user to create
 * @param db Databases
 */
export const newUser = async (
  { id, name, email }: { id: string; name: string; email: string },
  db: Db
): Promise<IUser | null> => {
  const mongodb = db.collection(config.mongo.USER_COLLECTION);
  const result = await mongodb.updateOne(
    { id },
    {
      $set: {
        id,
        name,
        email,
        memoryLevel: 0,
        memories: []
      }
    },
    { upsert: true }
  );
  const newUser = await mongodb.findOne({
    id
  });
  return { ...newUser } as IUser;
};

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
  const userCollection = config.mongo.USER_COLLECTION;
  const mongodb = db.collection(userCollection);
  await mongodb.updateOne({ id }, { $set: { memoryLevel: level } });
  const user: IUser | null = await mongodb.findOne({ id });
  if (!user) return null;
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

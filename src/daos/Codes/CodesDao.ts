import { ICode, IMemory, IUser } from '@entities';
import { Db } from 'mongodb';
import { config } from '../../shared/config/config';

/**
 * Sets the new memory level to the user
 * @param code user Id to update
 * @param userId memory level to set to the user
 * @param db Databases
 */
export const useCode = async (
  code: string,
  userId: string,
  db: Db
): Promise<IMemory | null> => {
  const userCollection = db.collection(config.mongo.USER_COLLECTION);
  const codesCollection = db.collection(config.mongo.CODES_COLLECTION);
  const codeValue: ICode | null = await codesCollection.findOne({
    code
  });
  if (codeValue?.used) {
    return null;
  }
  const user: IUser | null = await userCollection.findOne({ id: userId });
  if (!user) {
    return null;
  }
  user.memoryLevel = user.memoryLevel + 1;
  if (user.memoryLevel > user.memories.length) {
    return null;
  }
  await userCollection.updateOne(
    { id: userId },
    { $set: { memoryLevel: user?.memoryLevel } }
  );
  await codesCollection.updateOne({ code }, { $set: { used: true } });
  return user.memories[user.memoryLevel - 1];
};

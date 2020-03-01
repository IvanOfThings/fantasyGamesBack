import { ITimeMachine } from '@entities';
import { logger } from '@shared';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { Db } from 'mongodb';
import schedule from 'node-schedule';
import TelegramBot = require('node-telegram-bot-api');
import { IConfig } from '../../shared/config/config';

/**
 * Sets the new memory level to the user
 * @param code user Id to update
 * @param userId memory level to set to the user
 * @param db Databases
 */
export const getGameStatus = async (
  gameID: string,
  db: Db,
  config: IConfig
): Promise<ITimeMachine | null> => {
  const timeCollection = db.collection(config.mongo.TIME_COLLECTION);
  const gameStatus: ITimeMachine | null = await timeCollection.findOne({
    gameID
  });

  if (!gameStatus) {
    throw Error('No Game found');
  }
  return gameStatus;
};

/**
 * Sets the new memory level to the user
 * @param code user Id to update
 * @param userId memory level to set to the user
 * @param db Databases
 */
export const start = async (
  gameID: string,
  db: Db,
  config: IConfig,
  bot: TelegramBot | null
): Promise<ITimeMachine | null> => {
  const timeCollection = db.collection(config.mongo.TIME_COLLECTION);
  const gameStatus: ITimeMachine | null = await timeCollection.findOne({
    gameID
  });

  logger.debug(gameID);
  if (!gameStatus) {
    throw Error('No Game found');
  }

  if (!gameStatus!.finished) {
    const finishDate = addMinutes(
      new Date(gameStatus!.startTime),
      gameStatus!.gametime
    );

    if (new Date(Date.now()) > finishDate) {
      // The game has finished
      await timeCollection.updateOne(
        { gameID },
        { $set: { finished: true, countDownStopped: false } }
      );
      throw Error(
        'Game have just finished. Please to start a new game call again the create method.'
      );
    }
    throw Error('The game have not finished yet');
  }

  await timeCollection.updateOne(
    { gameID },
    {
      $set: { startTime: Date.now(), finished: false, countDownStopped: false }
    }
  );

  const newGameStatus: ITimeMachine | null = await timeCollection.findOne({
    gameID
  });

  if (bot) {
    bot.sendMessage(config.telegram.CHATID, `El bucle temporal se ha iniciado`);
  }
  logger.debug('iniciando Juego');

  await planificarJuego(
    gameID,
    bot,
    config.telegram.CHATID,
    config.mongo.TIME_COLLECTION,
    db,
    gameStatus.gametime
  );
  return newGameStatus;
};

/**
 * Sets the new memory level to the user
 * @param code user Id to update
 * @param userId memory level to set to the user
 * @param db Databases
 */
export const stop = async (
  stopCode: string,
  gameID: string,
  db: Db,
  config: IConfig,
  bot: TelegramBot | null
): Promise<ITimeMachine | null> => {
  const timeCollection = db.collection(config.mongo.TIME_COLLECTION);
  const gameStatus: ITimeMachine | null = await timeCollection.findOne({
    gameID
  });

  logger.debug(gameID);
  if (!gameStatus) {
    throw Error('No Game found');
  }

  if (gameStatus!.finished) {
    const finishDate = addMinutes(
      new Date(gameStatus!.startTime),
      gameStatus!.gametime
    );

    if (new Date(Date.now()) > finishDate) {
      throw Error(
        'You have get late... You have been moved to the past in an infinite loop.'
      );
    }
  }

  if (stopCode !== gameStatus.stopCode) {
    throw Error('Wrong Code provided.');
  }

  if (gameStatus.countDownStopped) {
    throw Error('Count Down already stopped.');
  }
  await timeCollection.updateOne(
    { gameID },
    { $set: { startTime: Date.now(), finished: false, countDownStopped: true } }
  );

  const newGameStatus: ITimeMachine | null = await timeCollection.findOne({
    gameID
  });

  if (bot) {
    bot.sendMessage(
      config.telegram.CHATID,
      `El bucle temporal ha sido detenido`
    );
    bot.sendMessage(config.telegram.CHATID, `!!!!!!!!!!!!!!!!!!!!`);
  }
  logger.debug('Bucle temporal detenido');
  return newGameStatus;
};

const planificarJuego = async (
  gameID: string,
  bot: TelegramBot | null,
  chatid: string,
  collection: string,
  db: Db,
  gametime: number
) => {
  const timeCollection = db.collection(collection);

  const startTime = new Date(Date.now());
  const endTime = new Date(startTime.getTime() + 60000 * gametime);
  const gameSchedule = schedule.scheduleJob(
    { start: startTime, end: endTime, rule: '*/1 * * * *' },
    async () => {
      const gameStatus: Promise<ITimeMachine | null> = timeCollection.findOne({
        gameID
      });
      gameStatus.then(value => {
        const remainingTime = differenceInMinutes(
          endTime,
          new Date(Date.now())
        );
        if (!value!.countDownStopped) {
          if (remainingTime > 0) {
            if (bot) {
              bot.sendMessage(
                chatid,
                `Solo quedan ${remainingTime} minutos para reiniciar el bucle temporal.`
              );
            }
          } else {
            if (bot) {
              bot.sendMessage(chatid, `ATENCIÓN!!!!!!!`);
              bot.sendMessage(chatid, `!!!!!!!!!!!!!!!!!!!!`);
              bot.sendMessage(chatid, `EL BUCLE TEMPORAL SE HA REINICIADO`);
              bot.sendMessage(chatid, `HABÉIS QUEDADO ATRAPADOS EN EL TIEMPO`);
              bot.sendMessage(chatid, `=====================================`);
              bot.sendMessage(chatid, `======  FIN DE LA PARTIDA   =========`);
              bot.sendMessage(chatid, `=====================================`);
            }
          }
          timeCollection.updateOne({ gameID }, { $set: { finished: true } });
        }
      });
    }
  );
};

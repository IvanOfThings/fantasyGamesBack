export interface ITimeMachine {
  _id: string;
  gameId: string;
  gametime: number;
  events: number;
  startTime: Date;
  finished: boolean;
  nextEvent: number;
  countDownStopped: boolean;
  stopCode: string;
  nextSequenceCode: string;
}

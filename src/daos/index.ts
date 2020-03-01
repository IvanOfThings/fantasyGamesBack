const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/UserDao';
let codeDaoPath = './Codes/CodesDao';
let timeMachinePath = './TimeMachine/timeMachineDao';

if (usingMockDb === 'true') {
  userDaoPath += '.mock';
  codeDaoPath += '.mock';
  timeMachinePath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { CodeDao } = require(codeDaoPath);
export const { timeMachineDao } = require(timeMachinePath);

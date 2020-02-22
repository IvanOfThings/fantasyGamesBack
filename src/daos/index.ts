const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/UserDao';
let codeDaoPath = './Codes/CodesDao';

if (usingMockDb === 'true') {
  userDaoPath += '.mock';
  codeDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { CodeDao } = require(codeDaoPath);

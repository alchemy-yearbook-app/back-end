const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('memorybook routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('user can get memorybook', async () => {
    const agent = request.agent(app);
    await request(app).get('/api/v1/github/login');
    // call back redirect, exchange access_token
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    // posts
    const post1 = {
      id: expect.any(String),
      text: 'my first memory!',
    };

    const post2 = {
      id: expect.any(String),
      text: 'my second memory!',
    };

    const res = await agent.get('/api/v1/memorybook');

    expect(res.body).toEqual([post1, post2]);
  });
});

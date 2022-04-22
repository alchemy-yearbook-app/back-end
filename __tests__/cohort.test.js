const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// jest.mock('../lib/utils/github');

describe('cohort routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // after log in, hits a user endpoint that ensures successful log in
  it('sets and retrieves as currently signed in user', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.get('/api/v1/github/me');

    console.log('res.body', res.body);
    expect(res.body).toEqual({
      uuid: '2',
      username: null,
      githubUserId: null,
      teamToken: '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',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/utils/github');

describe('yearbook app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('lists teams in the organization an authenticated user is part of', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.redirects[0]).toEqual(
      expect.stringContaining('/api/v1/profile')
    );

    const req2 = await request
      .agent(app)
      .get('https://api.github.com/orgs/alchemycodelab/teams');
    console.log('req2.body.message', req2.body.message);
  });
});

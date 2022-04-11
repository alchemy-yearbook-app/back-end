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

  it('redirects to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it.only('should login and redirect to yearbook', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    // expect(res.req.path).toEqual('/api/v1/yearbook');
    expect(req.redirects[0]).toEqual(
      expect.stringContaining('/api/v1/yearbook')
    );
  });

  it('logs a user out through a delete route', async () => {
    await GithubUser.createUser({
      username: 'fake_github_user',
      avatar_url: 'https://www.placecage.com/gif/300/300',
      email: 'not-real@example.com',
    });

    const res = await request(app).delete('/api/v1/github/sessions');

    expect(res.body.message).toEqual('Signed out successfully');
  });
});

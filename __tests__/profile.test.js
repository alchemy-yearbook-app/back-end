const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('yearbook app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a profile', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.redirects[0]).toEqual(
      expect.stringContaining('/api/v1/profile')
    );

    const req2 = await request.agent(app).post('/api/v1/profile').send({
      first_name: 'Bing Bong',
      last_name: 'Ding Dong',
      quote: 'Shablooey',
    });

    expect(req2.body).toEqual({
      id: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      quote: expect.any(String),
    });
  });
});

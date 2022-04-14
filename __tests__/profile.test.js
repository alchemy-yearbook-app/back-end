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
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const req2 = await agent.post('/api/v1/profile').send({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
    });

    console.log('req2.body', req2.body);

    expect(req2.body).toEqual({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
    });
  });
});

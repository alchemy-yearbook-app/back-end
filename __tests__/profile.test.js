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
      id: expect.any(String),
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
    });
  });

  it('updates a profile', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const profile = await agent.post('/api/v1/profile').send({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
    });

    const res = await agent.patch(`/api/v1/profile/${profile.id}`).send({
      avatar: 'Airbender',
      firstName: 'Bing Bong',
      lastName: 'Dh',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'I like it when they call me big papi',
      company: 'Red Sox',
    });

    const expected = {
      avatar: 'Airbender',
      firstName: 'David Ortiz',
      lastName: 'Dh',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'I like it when they call me big papi',
      company: 'Red Sox',
    };

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});

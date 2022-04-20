const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Memorybook = require('../lib/models/Memorybook');

jest.mock('../lib/utils/github');

describe('memorybook routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a memorybook item', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const res = await agent.post('/api/v1/memorybook').send({
      imageUrl: 'Image-1',
      audio: 'Some audio',
      text: 'Some text',
      resourceUrl: 'Some resource',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      imageUrl: 'Image-1',
      audio: 'Some audio',
      text: 'Some text',
      resourceUrl: 'Some resource',
    });
  });

  it('gets all items in memorybook', async () => {
    const agent = request.agent(app);
    await request(app).get('/api/v1/github/login');
    // call back redirect, exchange access_token
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    // posts
    const post1 = await Memorybook.insert({
      id: expect.any(String),
      text: 'my first memory!',
    });

    const post2 = await Memorybook.insert({
      id: expect.any(String),
      text: 'my second memory!',
    });

    const res = await agent.get('/api/v1/memorybook');

    expect(res.body).toEqual([post1, post2]);
  });
});

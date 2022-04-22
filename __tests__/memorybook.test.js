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
      name: 'name',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      imageUrl: 'Image-1',
      audio: 'Some audio',
      text: 'Some text',
      resourceUrl: 'Some resource',
      name: 'name',
    });
  });

  it('gets all items in memorybook', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login');
    // call back redirect, exchange access_token
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    // posts
    const post1 = await Memorybook.insert({
      text: 'my first memory!',
      name: 'name',
    });

    const post2 = await Memorybook.insert({
      text: 'my second memory!',
      name: 'name',
    });

    const res = await agent.get('/api/v1/memorybook');

    expect(res.body).toEqual([
      {
        audio: '',
        id: '1',
        imageUrl: 'https://i.ibb.co/qB7Pw9w/IMG-9759.jpg',
        name: 'kevin',
        resourceUrl: '',
        text: 'test',
      },
      post1,
      post2,
    ]);
  });

  it('gets a memory', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login');
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const memory = await Memorybook.insert({
      text: 'my first memory!',
      name: 'name',
    });

    const res = await agent.get(`/api/v1/memorybook/${memory.id}`);

    expect(res.body).toEqual(memory);
  });

  it('deletes a memory', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login');
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const memory = await Memorybook.insert({
      id: '1',
      text: 'my first memory!',
      name: 'name',
    });

    const res = await agent.delete(`/api/v1/memorybook/${memory.id}`);

    expect(res.body).toEqual(memory);
  });
});

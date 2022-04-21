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

  it('creates a piece of advice', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);
    await agent.get('/login/callback');

    const req = await agent.post('/api/v1/advice/create').send({
      title: 'Advice title',
      advice: 'Advice body',
      alumniName: 'Alumni name',
      cohort: 'Alumin Cohort',
    });

    expect(req.body).toEqual({
      id: expect.any(String),
      title: 'Advice title',
      advice: 'Advice body',
      alumniName: 'Alumni name',
      cohort: 'Alumin Cohort',
    });
  });
});

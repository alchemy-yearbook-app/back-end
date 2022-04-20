const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Profile = require('../lib/models/Profile');
const { getProfileById } = require('../lib/models/Profile');

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

    const req2 = await agent.post('/api/v1/profile/create').send({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
      email: 'bingbong@gmail.com',
    });

    expect(req2.body).toEqual({
      id: expect.any(String),
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
      email: 'bingbong@gmail.com',
    });
  });

  it('gets a profile', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const profile = await Profile.getProfileById(1);

    const res = await agent.get(`/api/v1/profile/${profile.id}`);

    expect(res.body).toEqual(profile);
  });

  it('gets all profiles', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const profile = await Profile.getProfiles();

    const res = await agent.get('/api/v1/profile');

    expect(res.body).toEqual(profile);
  });

  it('updates a profile', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const profile = await Profile.createProfile({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
      email: 'bingbong@gmail.com',
    });

    const res = await agent.patch(`/api/v1/profile/${profile.id}`).send({
      avatar: 'Airbender',
      firstName: 'David Ortiz',
      lastName: 'Dh',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'I like it when they call me big papi',
      company: 'Red Sox',
      email: 'bingbong@gmail.com',
    });

    const expected = {
      avatar: 'Airbender',
      firstName: 'David Ortiz',
      lastName: 'Dh',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'I like it when they call me big papi',
      company: 'Red Sox',
      email: 'bingbong@gmail.com',
    };

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('deletes a profile', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const profile = await Profile.createProfile({
      avatar: 'Blue Person',
      firstName: 'Bing Bong',
      lastName: 'Ding Dong',
      linkedIn: 'yeetin',
      github: 'gitin',
      quote: 'Shablooey',
      company: 'quan',
    });

    const res = await agent.delete(`/api/v1/profile/${profile.id}`);

    expect(res.body).toEqual(profile);
    expect(await getProfileById(profile.id)).toBeNull();
  });
});

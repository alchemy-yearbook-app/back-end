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

  // after log in, hits a user endpoint that ensures successful log in
  it('sets and retrieves as currently signed in user', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.get('/api/v1/user');

    expect(res.body).toEqual({
      login: 'H-Indiana-Holdsworth',
      id: 88062154,
      node_id: 'MDQ6VXNlcjg4MDYyMTU0',
      avatar_url: 'https://avatars.githubusercontent.com/u/88062154?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/H-Indiana-Holdsworth',
      html_url: 'https://github.com/H-Indiana-Holdsworth',
      followers_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/followers',
      following_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/following{/other_user}',
      gists_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/subscriptions',
      organizations_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/orgs',
      repos_url: 'https://api.github.com/users/H-Indiana-Holdsworth/repos',
      events_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/H-Indiana-Holdsworth/received_events',
      type: 'User',
      site_admin: false,
      name: 'H. Indiana Holdsworth',
      company: null,
      blog: '',
      location: null,
      email: null,
      hireable: null,
      bio: 'Full-Stack Software Developer with an affinity for efficiency. Talent for grasping and communicating complex ideas. A polished public speaker with natural style',
      twitter_username: null,
      public_repos: 74,
      public_gists: 0,
      followers: 9,
      following: 4,
      created_at: '2021-07-27T22:16:16Z',
      updated_at: '2022-03-18T19:53:54Z',
      private_gists: 0,
      total_private_repos: 3,
      owned_private_repos: 1,
      disk_usage: 39784,
      collaborators: 0,
      two_factor_authentication: false,
      plan: {
        name: 'pro',
        space: 976562499,
        collaborators: 0,
        private_repos: 9999,
      },
    });
  });

  // after login, get userData teams, user.github_team_id ===
  // fetch team data, insert github_team_id into cohort table
  it('should return github_team_id of current user', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.get('/api/v1/user/teams');
    // get from cohort github_team_id
    const expected = {
      githubTeamId: 5116318,
      name: 'september-2021',
    };
    expect(res.body).toEqual(expected);
  });
});

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

  it('gets users cohort data', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const res = agent.get('/api/v1/user/teams');
    console.log('res.body', res.body);

    expect(res.body).toEqual([
      {
        name: 'september-2021',
        id: 5116318,
        node_id: 'T_kwDOAX5zqc4AThGe',
        slug: 'september-2021',
        description: 'September 2021 Cohort Students',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5116318',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/september-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/5116318/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5116318/repos',
        permission: 'pull',
        created_at: '2021-09-13T20:37:20Z',
        updated_at: '2021-09-13T20:37:20Z',
        members_count: 27,
        repos_count: 24,
        organization: {
          login: 'alchemycodelab',
          id: 25064361,
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjI1MDY0MzYx',
          url: 'https://api.github.com/orgs/alchemycodelab',
          repos_url: 'https://api.github.com/orgs/alchemycodelab/repos',
          events_url: 'https://api.github.com/orgs/alchemycodelab/events',
          hooks_url: 'https://api.github.com/orgs/alchemycodelab/hooks',
          issues_url: 'https://api.github.com/orgs/alchemycodelab/issues',
          members_url:
            'https://api.github.com/orgs/alchemycodelab/members{/member}',
          public_members_url:
            'https://api.github.com/orgs/alchemycodelab/public_members{/member}',
          avatar_url: 'https://avatars.githubusercontent.com/u/25064361?v=4',
          description: 'Projects and resources for Alchemy Code Lab',
          name: 'Alchemy Code Lab',
          company: null,
          blog: 'alchemycodelab.com',
          location: 'Portland, OR',
          email: 'dev@alchemycodelab.com',
          twitter_username: null,
          is_verified: false,
          has_organization_projects: true,
          has_repository_projects: true,
          public_repos: 70,
          public_gists: 0,
          followers: 0,
          following: 0,
          html_url: 'https://github.com/alchemycodelab',
          created_at: '2017-01-11T19:24:56Z',
          updated_at: '2021-11-17T21:31:40Z',
          type: 'Organization',
        },
        parent: {
          name: 'students',
          id: 5077862,
          node_id: 'T_kwDOAX5zqc4ATXtm',
          slug: 'students',
          description: 'Current Alchemy Students',
          privacy: 'closed',
          url: 'https://api.github.com/organizations/25064361/team/5077862',
          html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
          members_url:
            'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
          repositories_url:
            'https://api.github.com/organizations/25064361/team/5077862/repos',
          permission: 'pull',
        },
      },
    ]);
  });

  // after login, get userData teams, user.github_team_id ===
  // fetch team data, insert github_team_id into cohort table
  it.only('should return github_team_id of current user', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.get('/api/v1/user/teams');
    // get from cohort github_team_id
    const expected = {
      github_team_id: 5116318,
      name: 'september-2021',
    };
    expect(res.body).toEqual(expected);
  });
});

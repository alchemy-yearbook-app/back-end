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

  it('gets a cohort back', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    await agent.get('/login/callback');

    const res = agent.get('https://api.github.com/user/teams');
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
});

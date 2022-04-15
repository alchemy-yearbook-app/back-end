const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('github app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('lists teams in the organization an authenticated user is part of', async () => {
    const req = await request
      .agent(app)
      .get('/orgs/alchemycodelab/teams/students/teams');
    expect(req.body).toEqual([
      {
        name: 'spring-2020',
        id: 3730468,
        node_id: 'MDQ6VGVhbTM3MzA0Njg=',
        slug: 'spring-2020',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/3730468',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/spring-2020',
        members_url:
          'https://api.github.com/organizations/25064361/team/3730468/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/3730468/repos',
        permission: 'pull',
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
      {
        name: 'summer-2020',
        id: 3904787,
        node_id: 'MDQ6VGVhbTM5MDQ3ODc=',
        slug: 'summer-2020',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/3904787',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/summer-2020',
        members_url:
          'https://api.github.com/organizations/25064361/team/3904787/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/3904787/repos',
        permission: 'pull',
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
      {
        name: 'january-2021',
        id: 4393318,
        node_id: 'MDQ6VGVhbTQzOTMzMTg=',
        slug: 'january-2021',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/4393318',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/january-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/4393318/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/4393318/repos',
        permission: 'pull',
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
      {
        name: 'march-2021',
        id: 4648262,
        node_id: 'MDQ6VGVhbTQ2NDgyNjI=',
        slug: 'march-2021',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/4648262',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/march-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/4648262/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/4648262/repos',
        permission: 'pull',
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
      {
        name: 'april-2021',
        id: 4756493,
        node_id: 'MDQ6VGVhbTQ3NTY0OTM=',
        slug: 'april-2021',
        description: 'Students of the April 2021 Cohort',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/4756493',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/april-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/4756493/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/4756493/repos',
        permission: 'pull',
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
      {
        name: 'june-2021',
        id: 4902322,
        node_id: 'MDQ6VGVhbTQ5MDIzMjI=',
        slug: 'june-2021',
        description: 'June 2021 Cohort',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/4902322',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/june-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/4902322/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/4902322/repos',
        permission: 'pull',
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
      {
        name: 'august-2021',
        id: 5022792,
        node_id: 'T_kwDOAX5zqc4ATKRI',
        slug: 'august-2021',
        description: 'Alchemy August 2021 Cohort Students ',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5022792',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/august-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/5022792/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5022792/repos',
        permission: 'pull',
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
      {
        name: 'november-2021',
        id: 5116328,
        node_id: 'T_kwDOAX5zqc4AThGo',
        slug: 'november-2021',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5116328',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/november-2021',
        members_url:
          'https://api.github.com/organizations/25064361/team/5116328/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5116328/repos',
        permission: 'pull',
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
      {
        name: 'january-2022',
        id: 5553244,
        node_id: 'T_kwDOAX5zqc4AVLxc',
        slug: 'january-2022',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5553244',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/january-2022',
        members_url:
          'https://api.github.com/organizations/25064361/team/5553244/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5553244/repos',
        permission: 'pull',
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
      {
        name: 'february-2022',
        id: 5726384,
        node_id: 'T_kwDOAX5zqc4AV2Cw',
        slug: 'february-2022',
        description: '',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5726384',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/february-2022',
        members_url:
          'https://api.github.com/organizations/25064361/team/5726384/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5726384/repos',
        permission: 'pull',
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
      {
        name: 'april-2022',
        id: 5935017,
        node_id: 'T_kwDOAX5zqc4AWo-p',
        slug: 'april-2022',
        description: 'April 2022 Cohort',
        privacy: 'closed',
        url: 'https://api.github.com/organizations/25064361/team/5935017',
        html_url: 'https://github.com/orgs/alchemycodelab/teams/april-2022',
        members_url:
          'https://api.github.com/organizations/25064361/team/5935017/members{/member}',
        repositories_url:
          'https://api.github.com/organizations/25064361/team/5935017/repos',
        permission: 'pull',
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

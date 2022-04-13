const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const {
  exchangeCodeForToken,
  getGithubProfile,
  exchangeTokenForProfile,
} = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router().get(
  '/alchemycodelab/teams',
  authenticate,
  async (req, res) => {
    const token = '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';

    const profile = exchangeTokenForProfile(token);
    console.log('profile', profile);

    // const team = [
    //   {
    //     name: 'instructors',
    //     id: 2233104,
    //     node_id: 'MDQ6VGVhbTIyMzMxMDQ=',
    //     slug: 'instructors',
    //     description: 'Alchemy Code Lab instructors',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/2233104',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/instructors',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/2233104/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/2233104/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'staff',
    //       id: 5077871,
    //       node_id: 'T_kwDOAX5zqc4ATXtv',
    //       slug: 'staff',
    //       description: 'All Staff',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077871',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/staff',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'Instructional Team',
    //     id: 3211697,
    //     node_id: 'MDQ6VGVhbTMyMTE2OTc=',
    //     slug: 'instructional-team',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/3211697',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/instructional-team',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/3211697/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/3211697/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'instructors',
    //       id: 2233104,
    //       node_id: 'MDQ6VGVhbTIyMzMxMDQ=',
    //       slug: 'instructors',
    //       description: 'Alchemy Code Lab instructors',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/2233104',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/instructors',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/2233104/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/2233104/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'FSJS Instruction',
    //     id: 3246798,
    //     node_id: 'MDQ6VGVhbTMyNDY3OTg=',
    //     slug: 'fsjs-instruction',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/3246798',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/fsjs-instruction',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/3246798/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/3246798/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'instructors',
    //       id: 2233104,
    //       node_id: 'MDQ6VGVhbTIyMzMxMDQ=',
    //       slug: 'instructors',
    //       description: 'Alchemy Code Lab instructors',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/2233104',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/instructors',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/2233104/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/2233104/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'back-office-staff',
    //     id: 3481113,
    //     node_id: 'MDQ6VGVhbTM0ODExMTM=',
    //     slug: 'back-office-staff',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/3481113',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/back-office-staff',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/3481113/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/3481113/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'staff',
    //       id: 5077871,
    //       node_id: 'T_kwDOAX5zqc4ATXtv',
    //       slug: 'staff',
    //       description: 'All Staff',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077871',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/staff',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'spring-2020',
    //     id: 3730468,
    //     node_id: 'MDQ6VGVhbTM3MzA0Njg=',
    //     slug: 'spring-2020',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/3730468',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/spring-2020',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/3730468/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/3730468/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'summer-2020',
    //     id: 3904787,
    //     node_id: 'MDQ6VGVhbTM5MDQ3ODc=',
    //     slug: 'summer-2020',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/3904787',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/summer-2020',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/3904787/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/3904787/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'january-2021',
    //     id: 4393318,
    //     node_id: 'MDQ6VGVhbTQzOTMzMTg=',
    //     slug: 'january-2021',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/4393318',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/january-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/4393318/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/4393318/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'march-2021',
    //     id: 4648262,
    //     node_id: 'MDQ6VGVhbTQ2NDgyNjI=',
    //     slug: 'march-2021',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/4648262',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/march-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/4648262/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/4648262/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'april-2021',
    //     id: 4756493,
    //     node_id: 'MDQ6VGVhbTQ3NTY0OTM=',
    //     slug: 'april-2021',
    //     description: 'Students of the April 2021 Cohort',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/4756493',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/april-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/4756493/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/4756493/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'june-2021',
    //     id: 4902322,
    //     node_id: 'MDQ6VGVhbTQ5MDIzMjI=',
    //     slug: 'june-2021',
    //     description: 'June 2021 Cohort',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/4902322',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/june-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/4902322/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/4902322/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'august-2021-tas',
    //     id: 5022789,
    //     node_id: 'T_kwDOAX5zqc4ATKRF',
    //     slug: 'august-2021-tas',
    //     description: 'August 2021 cohort TAs',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5022789',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/august-2021-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5022789/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5022789/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'august-2021',
    //     id: 5022792,
    //     node_id: 'T_kwDOAX5zqc4ATKRI',
    //     slug: 'august-2021',
    //     description: 'Alchemy August 2021 Cohort Students ',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5022792',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/august-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5022792/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5022792/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'students',
    //     id: 5077862,
    //     node_id: 'T_kwDOAX5zqc4ATXtm',
    //     slug: 'students',
    //     description: 'Current Alchemy Students',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5077862',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5077862/repos',
    //     permission: 'pull',
    //     parent: null,
    //   },
    //   {
    //     name: 'staff',
    //     id: 5077871,
    //     node_id: 'T_kwDOAX5zqc4ATXtv',
    //     slug: 'staff',
    //     description: 'All Staff',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5077871',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/staff',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5077871/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5077871/repos',
    //     permission: 'pull',
    //     parent: null,
    //   },
    //   {
    //     name: 'teaching-assistants',
    //     id: 5115864,
    //     node_id: 'T_kwDOAX5zqc4ATg_Y',
    //     slug: 'teaching-assistants',
    //     description: 'Teaching Assistants',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5115864',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5115864/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'staff',
    //       id: 5077871,
    //       node_id: 'T_kwDOAX5zqc4ATXtv',
    //       slug: 'staff',
    //       description: 'All Staff',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077871',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/staff',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077871/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'september-2021',
    //     id: 5116318,
    //     node_id: 'T_kwDOAX5zqc4AThGe',
    //     slug: 'september-2021',
    //     description: 'September 2021 Cohort Students',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5116318',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/september-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5116318/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5116318/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'november-2021',
    //     id: 5116328,
    //     node_id: 'T_kwDOAX5zqc4AThGo',
    //     slug: 'november-2021',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5116328',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/november-2021',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5116328/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5116328/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'september-2021-tas',
    //     id: 5116332,
    //     node_id: 'T_kwDOAX5zqc4AThGs',
    //     slug: 'september-2021-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5116332',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/september-2021-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5116332/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5116332/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'november-2021-tas',
    //     id: 5318176,
    //     node_id: 'T_kwDOAX5zqc4AUSYg',
    //     slug: 'november-2021-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5318176',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/november-2021-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5318176/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5318176/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'curriculum',
    //     id: 5388873,
    //     node_id: 'T_kwDOAX5zqc4AUjpJ',
    //     slug: 'curriculum',
    //     description: 'For managing curriculum',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5388873',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/curriculum',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5388873/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5388873/repos',
    //     permission: 'pull',
    //     parent: null,
    //   },
    //   {
    //     name: 'react',
    //     id: 5388874,
    //     node_id: 'T_kwDOAX5zqc4AUjpK',
    //     slug: 'react',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5388874',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/react',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5388874/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5388874/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'curriculum',
    //       id: 5388873,
    //       node_id: 'T_kwDOAX5zqc4AUjpJ',
    //       slug: 'curriculum',
    //       description: 'For managing curriculum',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5388873',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/curriculum',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'adv-react',
    //     id: 5403777,
    //     node_id: 'T_kwDOAX5zqc4AUnSB',
    //     slug: 'adv-react',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5403777',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/adv-react',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5403777/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5403777/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'curriculum',
    //       id: 5388873,
    //       node_id: 'T_kwDOAX5zqc4AUjpJ',
    //       slug: 'curriculum',
    //       description: 'For managing curriculum',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5388873',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/curriculum',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'express',
    //     id: 5403779,
    //     node_id: 'T_kwDOAX5zqc4AUnSD',
    //     slug: 'express',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5403779',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/express',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5403779/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5403779/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'curriculum',
    //       id: 5388873,
    //       node_id: 'T_kwDOAX5zqc4AUjpJ',
    //       slug: 'curriculum',
    //       description: 'For managing curriculum',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5388873',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/curriculum',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'web',
    //     id: 5403784,
    //     node_id: 'T_kwDOAX5zqc4AUnSI',
    //     slug: 'web',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5403784',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/web',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5403784/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5403784/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'curriculum',
    //       id: 5388873,
    //       node_id: 'T_kwDOAX5zqc4AUjpJ',
    //       slug: 'curriculum',
    //       description: 'For managing curriculum',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5388873',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/curriculum',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5388873/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'january-2022',
    //     id: 5553244,
    //     node_id: 'T_kwDOAX5zqc4AVLxc',
    //     slug: 'january-2022',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5553244',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/january-2022',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5553244/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5553244/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'january-2022-tas',
    //     id: 5557612,
    //     node_id: 'T_kwDOAX5zqc4AVM1s',
    //     slug: 'january-2022-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5557612',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/january-2022-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5557612/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5557612/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'february-2022-tas',
    //     id: 5689306,
    //     node_id: 'T_kwDOAX5zqc4AVs_a',
    //     slug: 'february-2022-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5689306',
    //     html_url:
    //       'https://github.com/orgs/alchemycodelab/teams/february-2022-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5689306/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5689306/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'february-2022',
    //     id: 5726384,
    //     node_id: 'T_kwDOAX5zqc4AV2Cw',
    //     slug: 'february-2022',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5726384',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/february-2022',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5726384/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5726384/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'students',
    //       id: 5077862,
    //       node_id: 'T_kwDOAX5zqc4ATXtm',
    //       slug: 'students',
    //       description: 'Current Alchemy Students',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5077862',
    //       html_url: 'https://github.com/orgs/alchemycodelab/teams/students',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5077862/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'lead-tas',
    //     id: 5731144,
    //     node_id: 'T_kwDOAX5zqc4AV3NI',
    //     slug: 'lead-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5731144',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/lead-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5731144/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5731144/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    //   {
    //     name: 'april-2022-tas',
    //     id: 5901796,
    //     node_id: 'T_kwDOAX5zqc4AWg3k',
    //     slug: 'april-2022-tas',
    //     description: '',
    //     privacy: 'closed',
    //     url: 'https://api.github.com/organizations/25064361/team/5901796',
    //     html_url: 'https://github.com/orgs/alchemycodelab/teams/april-2022-tas',
    //     members_url:
    //       'https://api.github.com/organizations/25064361/team/5901796/members{/member}',
    //     repositories_url:
    //       'https://api.github.com/organizations/25064361/team/5901796/repos',
    //     permission: 'pull',
    //     parent: {
    //       name: 'teaching-assistants',
    //       id: 5115864,
    //       node_id: 'T_kwDOAX5zqc4ATg_Y',
    //       slug: 'teaching-assistants',
    //       description: 'Teaching Assistants',
    //       privacy: 'closed',
    //       url: 'https://api.github.com/organizations/25064361/team/5115864',
    //       html_url:
    //         'https://github.com/orgs/alchemycodelab/teams/teaching-assistants',
    //       members_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/members{/member}',
    //       repositories_url:
    //         'https://api.github.com/organizations/25064361/team/5115864/repos',
    //       permission: 'pull',
    //     },
    //   },
    // ];
    res.send(profile);
  }
);

const fetch = require('cross-fetch');

const getTeamData = async () => {
  const res = await fetch(
    'https://api.github.com/orgs/alchemycodelab/teams/students/teams',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.YEARBOOK_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const profile = await res.json();
  return profile;
};

// getTeamMembers? -> with login and avatar_url
const getOrgMembers = async () => {
  const res = await fetch(
    'https://api.github.com/orgs/alchemycodelab/members?per_page=100',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.YEARBOOK_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const orgMembers = await res.json();
  return orgMembers;
};

// appending profiles, remove duplicates

const getUserData = async () => {
  const res = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YEARBOOK_ACCESS_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const userData = await res.json();
  return userData;
};

const getUserTeam = async (teamToken) => {
  const res = await fetch(
    'https://api.github.com/organizations/25064361/team/5116318/members',
    {
      method: 'GET',
      headers: {
        Authorization: `token ${teamToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const userTeam = await res.json();

  return userTeam;
};

const getSeptember = async (cohortId) => {
  const res = await fetch(
    `https://api.github.com/${process.env.ALCHEMY}/${cohortId}/members`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.YEARBOOK_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const getSeptember = await res.json();
  console.log('getSeptember', getSeptember);
  return getSeptember;
};

module.exports = {
  getTeamData,
  getUserData,
  getUserTeam,
  getOrgMembers,
  getSeptember,
};

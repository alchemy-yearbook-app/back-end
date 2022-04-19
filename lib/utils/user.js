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

const getUserData = async () => {
  const res = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.JWT_SECRET}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const userData = await res.json();
  return userData;
};

const getUserTeam = async () => {
  const res = await fetch('https://api.github.com/user/teams', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.JWT_SECRET}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const userTeam = await res.json();
  return userTeam;
};

module.exports = {
  getTeamData,
  getUserData,
  getUserTeam,
};

const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  });
  const { access_token } = await resp.json();
  return access_token;
};

const getGithubProfile = async (token) => {
  const profileResp = await fetch('https://api.github/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  console.log('profileResp', profileResp);
  const { avatar_url, login } = await profileResp.json();
  return { username: login, photoUrl: avatar_url };
};

const exchangeTokenForProfile = async () => {
  console.log(
    'process.env.YEARBOOK_ACCESS_TOKEN',
    process.env.YEARBOOK_ACCESS_TOKEN
  );
  const res = await fetch(
    'https://api.github.com/orgs/alchemycodelab/teams/september-2021',
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

module.exports = {
  exchangeCodeForToken,
  getGithubProfile,
  exchangeTokenForProfile,
};

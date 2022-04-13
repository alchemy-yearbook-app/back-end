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

const exchangeTokenForProfile = async (token) => {
  // const token = `${process.env.YEARBOOK_ACCESS_TOKEN}`;
  const res = await fetch('https://api.github.com/orgs/alchemycodelab/teams', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  console.log('res', res);
  const profile = await res.json();
  return profile;
  // .then((res) => res.json())
  // .then((json) => console.log(json));
};

module.exports = {
  exchangeCodeForToken,
  getGithubProfile,
  exchangeTokenForProfile,
};

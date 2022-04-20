const pool = require('../utils/pool');

module.exports = class GithubUser {
  uuid;
  username;
  githubUserId;

  constructor(row) {
    this.uuid = row.uuid;
    this.username = row.username;
    this.githubUserId = row.github_user_id;
  }

  static async createUser({ username, githubUserId }) {
    if (!username) throw new Error('username is required');

    const { rows } = await pool.query(
      `
        INSERT INTO 
            github_users (username, github_user_id)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [username, githubUserId]
    );

    return new GithubUser(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            github_users
        WHERE
            username=$1
        `,
      [username]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }
};

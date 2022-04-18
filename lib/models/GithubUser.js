const pool = require('../utils/pool');

module.exports = class GithubUser {
  uuid;
  username;

  constructor(row) {
    this.uuid = row.uuid;
    this.username = row.username;
  }

  static async createUser({ username }) {
    if (!username) throw new Error('username is required');

    const { rows } = await pool.query(
      `
        INSERT INTO 
            github_users (username)
        VALUES
            ($1)
        RETURNING
            *
        `,
      [username]
    );

    return new GithubUser(rows[0]);
  }

  static async findByEmail(username) {
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

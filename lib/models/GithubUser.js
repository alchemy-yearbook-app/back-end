const pool = require('../utils/pool');

module.exports = class GithubUser {
  uuid;
  email;
  username;

  constructor(row) {
    this.uuid = row.uuid;
    this.email = row.email;
    this.username = row.username;
  }

  static async createUser({ email, username }) {
    if (!username) throw new Error('username is required');

    const { rows } = await pool.query(
      `
        INSERT INTO 
            github_users (email, username)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [email, username]
    );

    return new GithubUser(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            github_users
        WHERE
            email=$1
        `,
      [email]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }
};

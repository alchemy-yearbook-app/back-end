const pool = require('../utils/pool');

module.exports = class GithubUser {
  uuid;
  email;

  constructor(row) {
    this.uuid = row.uuid;
    this.email = row.email;
  }

  static async createUser({ email }) {
    if (!email) throw new Error('email is required');

    const { rows } = await pool.query(
      `
        INSERT INTO 
            github_users (email)
        VALUES
            ($1)
        RETURNING
            *
        `,
      [email]
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

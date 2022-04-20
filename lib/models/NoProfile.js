const pool = require('../utils/pool');

module.exports = class NoProfile {
  id;
  login;
  avatar;

  constructor(row) {
    this.id = row.no_profile_id;
    this.login = row.login;
    this.avatar_url = row.avatar_url;
    this.githubUserId = row.github_user_id;
  }

  static async createNoProfile({ login, avatar_url, githubUserId }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                no_profile (login, avatar_url, github_user_id)
            VALUES
                ($1, $2, $3)
            RETURNING
            *
            `,
      [login, avatar_url, githubUserId]
    );
    return new NoProfile(rows[0]);
  }

  static async getNonProfiles() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM no_profile
            `
    );
    return rows.map((row) => new NoProfile(row));
  }
};

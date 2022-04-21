const pool = require('../utils/pool');

module.exports = class NoProfile {
  id;
  login;
  avatarUrl;
  githubUserId;
  htmlUrl;

  constructor(row) {
    this.id = row.no_profile_id;
    this.login = row.login;
    this.avatarUrl = row.avatar_url;
    this.githubUserId = row.github_user_id;
    this.htmlUrl = row.html_url;
  }

  static async createNoProfile({ login, avatarUrl, githubUserId, htmlUrl }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                no_profile (login, avatar_url, github_user_id, html_url)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
            *
            `,
      [login, avatarUrl, githubUserId, htmlUrl]
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

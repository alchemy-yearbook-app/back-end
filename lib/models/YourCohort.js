const pool = require('../utils/pool');

module.exports = class YourCohort {
  id;
  login;
  avatar;

  constructor(row) {
    this.id = row.your_cohort_id;
    this.login = row.login;
    this.avatar_url = row.avatar_url;
    this.githubUserId = row.github_user_id;
  }

  static async createYourCohort({ login, avatar_url, githubUserId }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                your_cohort (login, avatar_url, github_user_id)
            VALUES
                ($1, $2, $3)
            RETURNING
            *
            `,
      [login, avatar_url, githubUserId]
    );
    return new YourCohort(rows[0]);
  }

  static async getYourCohort() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM no_profile
            `
    );
    return rows.map((row) => new YourCohort(row));
  }
};

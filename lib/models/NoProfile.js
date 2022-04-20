const pool = require('../utils/pool');

module.exports = class NoProfile {
  id;
  login;
  avatar;

  constructor(row) {
    this.id = row.no_profile_id;
    this.login = row.login;
    this.avatar_url = row.avatar_url;
  }

  static async createNoProfile({ login, avatar_url }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                no_profile (login, avatar_url)
            VALUES
                ($1, $2)
            RETURNING
            *
            `,
      [login, avatar_url]
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

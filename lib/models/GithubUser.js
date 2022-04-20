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
    // if (!username) throw new Error('username is required');

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

  static async getUser(uuid) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM github_users
            WHERE uuid=$1
            `,
      [uuid]
    );

    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  // insert into cohort _members
  // uuid & cohort_id

  // async insertUserId(uuid) {
  //   const { rows } = await pool.query(
  //     `
  //       INSERT INTO
  //         cohort_members (user_id)
  //       VALUES ($1)
  //       RETURNING
  //       *
  //     `,
  //     [uuid]
  //   );
  //   return rows;
  // // }

  async createCohortMember(uuid, githubTeamId) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            cohort_members (user_id, cohort_id)
          VALUES ($1, $2)
          RETURNING
          *
        `,
      [uuid, githubTeamId]
    );
    return rows;
  }
  // async insertCohortId(githubTeamId) {
  //   const { rows } = await pool.query(
  //     `
  //     INSERT INTO
  //       cohort_members(cohort_id)
  //     VALUES ($1)
  //     RETURNING
  //     *
  //     `,
  //     [githubTeamId]
  //   );
  //   return rows;
  // }
};

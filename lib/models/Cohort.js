const github = require('../controllers/github');
const pool = require('../utils/pool');

module.exports = class Cohort {
  githubTeamId;
  name;

  constructor(row) {
    this.githubTeamId = row.github_team_id;
    this.name = row.name;
  }

  static async createCohort({ githubTeamId, name }) {
    const { rows } = await pool.query(
      `
            INSERT INTO 
                  cohort (github_team_id, name)
            VALUES ($1, $2)
            RETURNING *
        `,
      [githubTeamId, name]
    );
    return new Cohort(rows[0]);
  }

  static async findCohortById(githubTeamId) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM cohort
            WHERE github_team_id=$1
            `,
      [githubTeamId]
    );

    if (!rows[0]) return null;
    return new Cohort(rows[0]);
  }

  static async findCohortByName(name) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM cohort
            WHERE name=$1
            `,
      [name]
    );

    if (!rows[0]) return null;
    return new Cohort(rows[0]);
  }

  toJSON() {
    return { ...this };
  }
};

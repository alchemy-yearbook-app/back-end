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
            INSERT INTO cohort (github_team_id, name)
            VALUES ($1, $2)
            RETURNING *
        `,
      [githubTeamId, name]
    );
    return new Cohort(rows[0]);
  }
};

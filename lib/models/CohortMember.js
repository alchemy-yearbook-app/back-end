const pool = require('../utils/pool');

module.exports = class CohortMember {
  userId;
  cohortId;

  constructor(row) {
    this.userId = row.user_id;
    this.cohortId = row.cohort_id;
  }

  static async getCohortMemberId(uuid) {
    const { rows } = await pool.query(
      `
      SELECT
        cohort_id
      FROM
        cohort_members
      WHERE
        user_id=$1
              
      `,
      [uuid]
    );

    console.log('rows', rows);
    return new CohortMember(rows[0]);
  }
};

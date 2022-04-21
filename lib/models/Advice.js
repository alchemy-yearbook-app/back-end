const pool = require('../utils/pool');

module.exports = class Advice {
  id;
  title;
  advice;
  alumniName;
  cohort;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.advice = row.advice;
    this.alumniName = row.alumni_name;
    this.cohort = row.cohort;
  }

  static async createAdvice({ title, advice, alumniName, cohort }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            advice (title, advice, alumni_name, cohort)
        VALUES
            ($1, $2, $3, $4)
        RETURNING
            *
          `,
      [title, advice, alumniName, cohort]
    );

    return new Advice(rows[0]);
  }

  static async getAllAdvice() {
    const { rows } = await pool.query(
      `
          SELECT 
            *
          FROM
            advice
          `
    );

    return rows.map((row) => new Advice(row));
  }

  static async getAdviceById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM
            advice
        WHERE
            id=$1
        `,
      [id]
    );

    if (!rows[0]) return null;

    return new Advice(rows[0]);
  }
};

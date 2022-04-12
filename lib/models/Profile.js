const pool = require('../utils/pool');

module.exports = class Profile {
  avatar;
  first_name;
  last_name;
  linked_in;
  github;
  quote;
  company;

  constructor(row) {
    this.avatar = row.avatar;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.linkedIn = row.linked_in;
    this.github = row.github;
    this.quote = row.quote;
    this.company = row.company;
  }

  static async getProfiles() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM profile
            `
    );
    return rows.map((row) => new Profile(row));
  }
};

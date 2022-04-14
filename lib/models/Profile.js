const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  avatar;
  firstName;
  lastName;
  linkedIn;
  github;
  quote;
  company;

  constructor(row) {
    this.id = row.id;
    this.avatar = row.avatar;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.linkedIn = row.linked_in;
    this.github = row.github;
    this.quote = row.quote;
    this.company = row.company;
  }

  static async createProfile({
    avatar,
    firstName,
    lastName,
    linkedIn,
    github,
    quote,
    company,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        profile (avatar, first_name, last_name, linked_in, github, quote, company)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        *
      `,
      [avatar, firstName, lastName, linkedIn, github, quote, company]
    );

    return new Profile(rows[0]);
  }

  static async getProfileById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
        * 
      FROM 
        profile
      WHERE
        id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Profile(rows[0]);
  }

  static async updateProfile(id, attributes) {
    // const existingProfile = await Profile.

    const { rows } = await pool.query(
      `
        UPDATE 
          profile
        SET
          avatar=$2, first_name=$3, last_name=$4, linked_in=$5, github=$6, quote=$7, company=$8
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id, attributes]
    );

    return new Profile(rows[0]);
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

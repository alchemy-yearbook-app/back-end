const pool = require('../utils/pool');

// referencing github_user email using JOIN statement
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
    email,
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
    const existingProfile = await Profile.getProfileById(id);

    const updatedProfile = { ...existingProfile, ...attributes };

    const avatar = updatedProfile.avatar ?? existingProfile.avatar;
    const firstName = updatedProfile.firstName ?? existingProfile.firstName;
    const lastName = updatedProfile.lastName ?? existingProfile.lastName;
    const linkedIn = updatedProfile.linkedIn ?? existingProfile.linkedIn;
    const github = updatedProfile.github ?? existingProfile.github;
    const quote = updatedProfile.quote ?? existingProfile.quote;
    const company = updatedProfile.company ?? existingProfile.company;

    if (!existingProfile) {
      const error = new Error(`Profile ${id} not found`);
      error.status = 404;
      throw error;
    }

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
      [id, avatar, firstName, lastName, linkedIn, github, quote, company]
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

  async getEmails() {
    const { rows } = await pool.query(
      `
      SELECT
      *
    FROM
      profile
    LEFT JOIN
      github_users
    ON
      github_users.uuid = profile.user_id
    WHERE
      profile.id=$1
      `,
      [this.id]
    );
    const updatedProfile = rows.map((row) => ({
      id: row.id,
      email: row.email,
      avatar: row.avatar,
      company: row.company,
      firstName: row.first_name,
      github: row.github,
      lastName: row.last_name,
      linkedIn: row.linked_in,
      quote: row.quote,
    }));
    [this.profiles] = updatedProfile;
    return this.profiles;
  }

  static async deleteProfile(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        profile
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Profile(rows[0]);
  }
};

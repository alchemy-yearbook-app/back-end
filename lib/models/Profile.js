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
  email;
  pronoun;

  constructor(row) {
    this.id = row.id;
    this.avatar = row.avatar;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.linkedIn = row.linked_in;
    this.github = row.github;
    this.quote = row.quote;
    this.company = row.company;
    this.email = row.email;
    this.pronoun = row.pronoun;
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
    pronoun,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        profile (avatar, first_name, last_name, linked_in, github, quote, company, email, pronoun)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        *
      `,
      [
        avatar,
        firstName,
        lastName,
        linkedIn,
        github,
        quote,
        company,
        email,
        pronoun,
      ]
    );

    return new Profile(rows[0]);
  }

  async createYourProfile(uuid) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          profile (user_id)
        VALUES ($1)
        RETURNING
        *
      `,
      [uuid]
    );
    return rows;
  }

  static async getProfileById(uuid) {
    const { rows } = await pool.query(
      `
      SELECT 
        * 
      FROM 
        profile
      WHERE
        user_id=$1
      `,
      [uuid]
    );

    if (!rows[0]) return null;

    return new Profile(rows[0]);
  }

  static async updateProfile(id, attributes) {
    const genExistingProfile = await Profile.getProfileById(id);
    const existingProfile = await genExistingProfile.getYourProfile();

    const updatedProfile = { ...existingProfile, ...attributes };

    const avatar = updatedProfile.avatar ?? existingProfile.avatar;
    const firstName = updatedProfile.firstName ?? existingProfile.firstName;
    const lastName = updatedProfile.lastName ?? existingProfile.lastName;
    const linkedIn = updatedProfile.linkedIn ?? existingProfile.linkedIn;
    const github = updatedProfile.github ?? existingProfile.github;
    const quote = updatedProfile.quote ?? existingProfile.quote;
    const company = updatedProfile.company ?? existingProfile.company;
    const email = updatedProfile.email ?? existingProfile.email;
    const pronoun = updatedProfile.pronoun ?? existingProfile.pronoun;

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
          avatar=$2, first_name=$3, last_name=$4, linked_in=$5, github=$6, quote=$7, company=$8, email=$9, pronoun=$10
        WHERE
          id=$1
        RETURNING
          *
        `,
      [
        id,
        avatar,
        firstName,
        lastName,
        linkedIn,
        github,
        quote,
        company,
        email,
        pronoun,
      ]
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

  // method to also get noProfiles

  async getNoProfiles() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      no_profile
      `
    );
    this.no_profile = rows;
    return this;
  }
  // method where you join profiles + github_user to get user_id

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

  // method to get profiles according to user_id

  async getYourProfile(uuid) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        profile
      LEFT JOIN
        github_users
      ON
        profile.user_id = github_users.uuid
      WHERE
        github_users.uuid=$1
        
      `,
      [this.uuid]
    );
    this.profile = rows;
    return this;
  }
};

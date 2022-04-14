const pool = require('../utils/pool');

module.exports = class Memorybook {
  id;
  imageUrl;
  audio;
  text;
  resourceUrl;

  constructor(row) {
    this.id = row.id;
    this.imageUrl = row.image_url;
    this.audio = row.audio;
    this.text = row.text;
    this.resourceUrl = row.resource_url;
  }

  static async insert({ imageUrl, audio, text, resourceUrl }) {
    const { rows } = await pool.query(
      `
            INSERT INTO Memorybook (image_url, audio, text, resource_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
      [imageUrl, audio, text, resourceUrl]
    );
    // resource folder -> lists out all the images
    // create each memorybook object by matching
    // JOIN memorybook cohort_id === cohort id
    // JOIN cohort user_id === profile user_id
    return new Memorybook(rows[0]);
  }

  static async getAllMems() {
    const { rows } = pool.query(
      `
      SELECT *
      FROM memorybook
      `
    );
    return rows.map((row) => new Memorybook(row));
  }
};

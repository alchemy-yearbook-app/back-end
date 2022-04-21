const pool = require('../utils/pool');

module.exports = class Memorybook {
  id;
  imageUrl;
  audio;
  text;
  resourceUrl;
  name;

  constructor(row) {
    this.id = row.id;
    this.imageUrl = row.image_url;
    this.audio = row.audio;
    this.text = row.text;
    this.resourceUrl = row.resource_url;
    this.name = row.name;
  }

  static async insert({ imageUrl, audio, text, resourceUrl, name }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        memorybook (image_url, audio, text, resource_url, name)
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING 
         *
      `,
      [imageUrl, audio, text, resourceUrl, name]
    );
    // resource folder -> lists out all the images
    // create each memorybook object by matching
    // JOIN memorybook cohort_id === cohort id
    // JOIN cohort user_id === profile user_id
    return new Memorybook(rows[0]);
  }

  static async getAllMems() {
    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM 
        memorybook
      `
    );
    return rows.map((row) => new Memorybook(row));
  }

  static async getMemoryById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM
        memorybook
      WHERE
        id=$1
      `,
      [id]
    );

    if (!rows) return null;

    return new Memorybook(rows[0]);
  }

  static async deleteMemory(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        memorybook
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Memorybook(rows[0]);
  }
};

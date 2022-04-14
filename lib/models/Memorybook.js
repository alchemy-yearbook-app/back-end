const pool = require('../utils/pool');

module.exports = class Memorybook {
  id;
  imageUrl;
  audio;
  text;

  constructor(row) {
    this.id = row.id;
    this.imageUrl = row.image_url;
    this.audio = row.audio;
    this.text = row.text;
  }

  static async insert({ imageUrl, audio, text }) {
    const { rows } = await pool.query(
      `
            INSERT INTO Memorybook (image_url, audio, text)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
      [imageUrl, audio, text]
    );
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

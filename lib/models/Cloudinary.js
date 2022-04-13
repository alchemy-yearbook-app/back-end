const pool = require('../utils/pool');

module.exports = class Cloudinary {
  id;
  imageUrl;

  constructor(row) {
    this.id = row.id;
    this.imageUrl = row.image_url;
  }

  static async insert({ imageUrl }) {
    const { rows } = await pool.query(
      `
            INSERT INTO cloudinary (image_url)
            VALUES ($1)
            RETURNING *
            `,
      [imageUrl]
    );
    return new Cloudinary(rows[0]);
  }
};

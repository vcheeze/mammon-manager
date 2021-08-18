import { NextApiHandler } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (req, res) => {
  const { name, color } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: 'Missing required field: name' });
    }

    const results = await query(
      `
      INSERT INTO category (name, color, id)
      VALUES (?, ?, ?)
      `,
      [name, color, uuidv4()]
    );

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

import { NextApiHandler } from 'next';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (req, res) => {
  const { name, amount, date, category } = req.body;
  try {
    if (!name || !amount || !date || !category) {
      return res.status(400).json({ message: 'Missing required field(s)' });
    }

    const results = await query(
      `
      INSERT INTO transaction (name, amount, date, category)
      VALUES (?, ?, ?, ?)
      `,
      [name, amount, date, category]
    );

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

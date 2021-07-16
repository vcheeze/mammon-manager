import { NextApiHandler } from 'next';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (_, res) => {
  try {
    const results = await query(`
      SELECT * FROM transaction
      ORDER BY date DESC
      LIMIT 10
    `);

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

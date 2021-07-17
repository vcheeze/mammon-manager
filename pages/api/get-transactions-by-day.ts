import { NextApiHandler } from 'next';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (req, res) => {
  const { date } = req.query;
  try {
    const results = await query(`
      SELECT * FROM transaction
      WHERE date = '${date}'
    `);

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

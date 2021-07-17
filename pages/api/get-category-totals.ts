import { NextApiHandler } from 'next';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (req, res) => {
  const { date } = req.query;
  try {
    let whereCondition: string = '';
    if (date) whereCondition = ` WHERE date = '${date}' `;

    const results = await query(`
      SELECT category, SUM(amount) AS total FROM transaction ${whereCondition}
      GROUP BY category
    `);

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

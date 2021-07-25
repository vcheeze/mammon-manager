import { NextApiHandler } from 'next';
import { query } from '../../lib/db';

const handler: NextApiHandler = async (req, res) => {
  const { firstDayOfMonth } = req.query;
  try {
    const results = await query(`
      SELECT date, SUM(amount) AS daily_total FROM transaction
      WHERE date BETWEEN '${firstDayOfMonth}' AND LAST_DAY('${firstDayOfMonth}')
      GROUP BY date
    `);

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;

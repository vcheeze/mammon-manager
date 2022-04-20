import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

import db from '@/constants/db';

const conn = new PSDB(db);

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, category },
    query: { id },
  } = req;

  switch (method) {
    case 'PUT': {
      if (!name || !amount || !date || !category) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      await conn.query(
        `UPDATE transactions SET name = '${name}', amount = ${amount}, date = '${date}', category = '${category}' WHERE id = ${id}`,
        null
      );
      return res.status(201).json({ name, amount, date, category });
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query(
          `SELECT * FROM transactions WHERE id = ${id}`,
          null
        );
        res.statusCode = 200;
        return res.json(getRows);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    case 'DELETE': {
      await conn.execute(`DELETE FROM transactions WHERE id = ${id}`, null);
      return res
        .status(200)
        .json({ message: `Successfully deleted transaction with id ${id}` });
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET', 'DELETE']);
      return res.status(405).json({ method: `Method ${method} Not Allowed` });
  }
};

export default handler;

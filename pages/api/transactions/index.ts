import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

import db from '@/constants/db';

const conn = new PSDB(db);

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, category },
  } = req;

  switch (method) {
    case 'POST': {
      if (!name || !amount || !date || !category) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      await conn.query(
        `INSERT INTO transactions (name, amount, date, category) VALUES ('${name}', ${amount}, '${date}', '${category}')`,
        null
      );
      res.statusCode = 201;
      return res.json({ name, amount, date, category });
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query(
          'SELECT * FROM transactions',
          null
        );
        res.statusCode = 200;
        return res.json(getRows);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

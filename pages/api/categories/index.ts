import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

import db from '@/constants/db';

const conn = new PSDB(db);

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, color },
  } = req;

  switch (method) {
    case 'POST': {
      if (!name || !color) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      await conn.query(
        `INSERT INTO categories (name, color) VALUES ('${name}', '${color}')`,
        null
      );
      res.statusCode = 201;
      return res.json({ name, color });
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query('SELECT * FROM categories', null);
        res.statusCode = 200;
        return res.json(getRows);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};

export default handler;

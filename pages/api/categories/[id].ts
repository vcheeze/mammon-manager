import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

import db from '@/constants/db';

const conn = new PSDB(db);

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, color },
    query: { id },
  } = req;

  switch (method) {
    case 'PUT': {
      if (!name || !color) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      await conn.query(
        `UPDATE categories SET name = '${name}', color = '${color}' WHERE id = ${id}`,
        null
      );
      return res.status(200).json({ name, color });
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query(
          `SELECT * FROM categories WHERE id = ${id}`,
          null
        );
        return res.status(200).json(getRows);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    case 'DELETE': {
      await conn.execute(`DELETE FROM categories WHERE id = ${id}`, null);
      return res
        .status(200)
        .json({ message: `Successfully deleted category with id ${id}` });
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

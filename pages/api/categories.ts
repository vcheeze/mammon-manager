import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, color },
  } = req;

  switch (method) {
    case 'POST': {
      const [rows, fields] = await conn.query(
        `INSERT INTO categories (name, color) VALUES ('${name}', '${color}')`,
        null
      );
      console.log('rows :>> ', rows);
      console.log('fields :>> ', fields);
      res.statusCode = 201;
      res.json(rows);
      break;
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query('SELECT * FROM categories', null);
        res.statusCode = 200;
        res.json(getRows);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

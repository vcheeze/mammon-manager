import { NextApiHandler } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, category },
  } = req;

  switch (method) {
    case 'POST': {
      await conn.query(
        `INSERT INTO transactions (name, amount, date, category) VALUES ('${name}', ${amount}, '${date}', '${category}')`,
        null
      );
      res.statusCode = 201;
      res.json({ name, amount, date, category });
      break;
    }
    case 'GET': {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const [getRows, _] = await conn.query(
          'SELECT * FROM transactions',
          null
        );
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

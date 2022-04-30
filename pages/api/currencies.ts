import { NextApiHandler } from 'next';
import * as currencies from '@dinero.js/currencies';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(Object.values(currencies).map((c) => c.code));

export default handler;

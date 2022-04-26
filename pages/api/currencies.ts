import { NextApiHandler } from 'next';

import currencies from '@/lib/currencies';

const handler: NextApiHandler = async (req, res) =>
  res.status(200).json(currencies);

export default handler;

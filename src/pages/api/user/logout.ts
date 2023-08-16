import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { serialize } from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return logout(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = serialize('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });
  res.setHeader('Set-Cookie', cookie);
  res.status(StatusCodes.OK).json({});
};

export default handler;

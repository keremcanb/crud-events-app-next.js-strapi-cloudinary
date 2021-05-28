import cookie from 'cookie';

export default async (req, res) => {
  // Destroy cookie
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        // Important part
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      })
    );
    res.status(200).json({ message: 'Successfully Logout' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

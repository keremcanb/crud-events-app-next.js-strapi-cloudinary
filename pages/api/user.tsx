import { API_URL } from '@/config/index';

const cookie = require('cookie');

export default async (req, res) => {
  if (req.method === 'GET') {
    // If no cookie, Not Authorized
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    // Get token
    const { token } = cookie.parse(req.headers.cookie);
    // Send token to Strapi backend
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = await strapiRes.json();
    // Send user object
    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: 'User Forbidden' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

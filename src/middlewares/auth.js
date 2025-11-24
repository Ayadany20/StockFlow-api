import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export default (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: 'No token provided' });

  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token)
    return res.status(401).json({ error: 'Malformed token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

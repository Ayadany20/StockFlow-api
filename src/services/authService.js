import userRepo from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export default {
  register: async (data) => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');

    const hash = await bcrypt.hash(data.password, 10);

    const user = await userRepo.create({ ...data, password: hash });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return { user, token };
  },

  login: async (email, password) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return { user, token };
  }
};

import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'tripsphere_dev_jwt_secret_2027';
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '30d',
  });
};


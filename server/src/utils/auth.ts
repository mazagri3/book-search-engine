import jwt from 'jsonwebtoken';
import type { UserDocument } from '../models/User';
import { GraphQLError } from 'graphql';

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

export const signToken = (user: UserDocument) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const authMiddleware = async ({ req }: { req: any }) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // We split the token string into an array and return actual token
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return { req };
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: any };
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return { req };
}; 
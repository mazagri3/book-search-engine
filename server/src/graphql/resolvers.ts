import { GraphQLError } from 'graphql';
import User, { type UserDocument } from '../models/User';
import { signToken } from '../utils/auth';

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: { user: UserDocument }) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new GraphQLError('You need to be logged in!', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    },
  },

  Mutation: {
    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError('No user found with this email address', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (_: any, { bookData }: { bookData: any }, context: { user: UserDocument }) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
      }
      throw new GraphQLError('You need to be logged in!', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    },

    removeBook: async (_: any, { bookId }: { bookId: string }, context: { user: UserDocument }) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new GraphQLError('You need to be logged in!', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    },
  },
};

export default resolvers; 
import { GraphQLError } from 'graphql';
import User from '../models/User';
import { signToken } from '../utils/auth';
const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new GraphQLError('You need to be logged in!', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        },
    },
    Mutation: {
        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
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
        saveBook: async (_, { bookData }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: bookData } }, { new: true, runValidators: true });
            }
            throw new GraphQLError('You need to be logged in!', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
            }
            throw new GraphQLError('You need to be logged in!', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        },
    },
};
export default resolvers;

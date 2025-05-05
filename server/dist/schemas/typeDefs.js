// This file defines what our data looks like and what operations we can do
const typeDefs = `#graphql
  # User type - defines what data a user has
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Book type - defines what data a book has
  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  # Auth type - what we get back when logging in
  type Auth {
    token: String!
    user: User!
  }

  # Queries - ways to get data
  type Query {
    me: User
  }

  # Input type - format for sending book data
  input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  # Mutations - ways to change data
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;
export default typeDefs;

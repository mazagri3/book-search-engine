import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import db from './config/connection.js';
import { typeDefs, resolvers } from './graphql/index.js';
import { authMiddleware } from './utils/auth.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Create a new Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Start the Apollo Server
const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    // Apply Apollo Server middleware
    app.use('/graphql', json(), expressMiddleware(server, {
        context: authMiddleware,
    }));
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`);
            console.log(`🚀 GraphQL playground available at http://localhost:${PORT}/graphql`);
        });
    });
};
startApolloServer();

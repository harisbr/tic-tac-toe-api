import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { GameSessionResolver } from './resolvers/gameSession';
import { PlayerResolver } from './resolvers/player';
import { GameMoveResolver } from './resolvers/gameMove';


const main = async () => {
    const schema = await buildSchema({
        resolvers: [GameSessionResolver, PlayerResolver, GameMoveResolver],
        emitSchemaFile: true,
        validate: false,
    });

    const server = new ApolloServer({ schema });
    const app = Express();
    server.applyMiddleware({ app });
    app.listen({ port: 3000 }, () => 
        console.log(`Server ready and listening at http://localhost:3000${server.graphqlPath}`)
    );
};
main().catch((error) => {
    console.log(error, 'error');
})
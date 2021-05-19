import { GraphQLServer } from "graphql-yoga";

import schema from './schema';
import { context } from './context';

const server = new GraphQLServer({
    schema,
    context,
});

server.start(() => console.log('server started!'));
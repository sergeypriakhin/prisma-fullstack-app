import { makeSchema } from "nexus";
import { nexusPrisma } from 'nexus-plugin-prisma';

import { Post } from "./Post";
import { Query } from "./Query";
import { User } from "./User";
import { Mutation } from './Mutation';

const schema = makeSchema({
    types: [User, Post, Query, Mutation],
    plugins: [nexusPrisma()],
    outputs: {
        typegen: __dirname + '/../../node_modules/@types/nexus-typegen/index.d.ts',
    },
});

export default schema;
import { arg, mutationType, nonNull } from "nexus";

export const Mutation = mutationType({
    definition(t) {
        t.field('createPost', {
            type: 'Post',
            args: {
                title: arg({ type: nonNull('String') }),
                text: arg({ type: 'String' }),
            },
            resolve: async (_, { title, text }, { prisma }) => {
                const post = prisma.post.create({
                    data: {
                        title,
                        text,
                        author: {
                            connect: {
                                id: 1
                            }
                        }
                    }
                })

                return post
            }
        });
    }
});
import { nonNull, list, queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field("posts", {
      type: nonNull(list(nonNull('Post'))),
      resolve: (root, args, ctx, info) => {
        return ctx.prisma.post.findMany();
      },
    });
  },
});

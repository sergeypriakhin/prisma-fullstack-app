import { nonNull, objectType } from 'nexus';

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.nonNull.model.id();
        t.model.title();
        t.model.text();
        t.model.author();
        t.model.createAt(undefined);
    },
});
import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
import React, { memo } from "react";

import { useGetPostsQuery } from "../../lib/types";
import PostCard, { POST_ON_CARD_FRAGMENT } from "../../components/PostCard";
import Header from '../../components/Header';

gql`
  query GetPosts {
    posts {
      ...PostOnCard
    }
  }
  ${POST_ON_CARD_FRAGMENT}
`;

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(2, 0),
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const { loading, data } = useGetPostsQuery();

  if (loading && !data) return <p>Loading...</p>;

  const posts = data?.posts || [];

  return (
    <>
      <Header to="/new-post" title="Posts" btnText="Create post" />

      <List>
        {posts.map((post) => (
          <ListItem key={post.id} className={classes.item}>
            <PostCard post={post} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(HomePage);

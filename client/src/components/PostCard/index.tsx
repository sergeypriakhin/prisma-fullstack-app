import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { memo } from "react";

import { PostOnCardFragment } from "../../lib/types";

export const POST_ON_CARD_FRAGMENT = gql`
  fragment PostOnCard on Post {
    id
    title
    text
    author {
      id
      name
    }
    createAt
  }
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

interface Props {
  post: PostOnCardFragment | null;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const classes = useStyles();

  if (post === null) return null;

  const { title, text, createAt, author } = post;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{author.name.charAt(0)}</Avatar>}
        title={title}
        subheader={createAt}
      />
      {text && (
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {text}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default memo(PostCard);

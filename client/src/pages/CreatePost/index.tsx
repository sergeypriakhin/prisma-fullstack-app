import { gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button } from "@material-ui/core";
import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";

import { useCreatePostMutation, CreatePostMutationVariables } from "../../lib/types";
import Header from '../../components/Header';

gql`
  mutation CreatePost($title: String!, $text: String) {
    createPost(title: $title, text: $text) {
      id
      __typename
      title
      text
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3, 2),
  },
  textField: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
}));

const CreatePost: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [addPost] = useCreatePostMutation({
    update(cache, { data }) {
      console.log('data', data)
      cache.modify({
        fields: {
          posts(existingPost = []) {
            const newPostRef = cache.writeFragment({
              data: data?.createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  type
                }
              `
            });
            
            return [newPostRef, ...existingPost];
          }
        }
      });
    }
  });
  const [formInput, setFormInput] = useState<CreatePostMutationVariables>({
    title: '',
    text: undefined,
  });

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    addPost({
      variables: formInput,
    }).then(() => {
      history.replace('/');
    })
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput((prevState: CreatePostMutationVariables) => ({...prevState, [name]: newValue }));
  };

  return (
    <div>
      <Header to="/" title="Create post" btnText="Back" />

      <Paper className={classes.root}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            required
            label="Title"
            name="title"
            defaultValue={formInput.title}
            className={classes.textField}
            onChange={handleInput}
          />
          <TextField
            label="Text"
            name="text"
            defaultValue={formInput.text}
            className={classes.textField}
            onChange={handleInput}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default memo(CreatePost);

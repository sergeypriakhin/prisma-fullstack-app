import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import React, { memo } from 'react';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      position: 'absolute',
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);

interface Props {
    to: string;
    title: string;
    btnText: string;
}

const Header: React.FC<Props> = ({
    to,
    title,
    btnText,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to={to} className={classes.btn}>{btnText}</Button>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default memo(Header);

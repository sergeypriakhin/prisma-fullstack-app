import { Container } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/Home";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <Container>
      <Switch>
        <Route path="/new-post">
          <CreatePost />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}

import React, {FunctionComponent, useEffect, useState} from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import User from "../domain/User";

interface LoginProps {
  authenticator: {
    onAuthStateChanged: (onUpdate: (currentUser: User | null) => void) => void;
    signInWithRedirect: () => void
  }
}

const Login: FunctionComponent<LoginProps> = ({authenticator, children}) => {
  const [currentUser, setCurrentUser] = useState<User|null|undefined>(undefined);

  useEffect(() => {
    authenticator.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, [authenticator])


  if (currentUser === undefined) {
    return <Loader active>Loading</Loader>;
  }

  if (currentUser) {
    return <div>{children}</div>;
  }

  return <Button basic size="large" onClick={() => { authenticator.signInWithRedirect() }}>
    <Icon name="google" />
    Sign in
  </Button>;
}

export default Login;

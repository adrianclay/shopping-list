import React, {useEffect, useState, PropsWithChildren} from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import User from "../domain/User";

interface LoginProps {
  authenticator: {
    onAuthStateChanged: (onUpdate: (currentUser: User | null) => void) => void;
    signInWithRedirect: () => void
  }
}

const LoggedInUserContext = React.createContext<User|undefined>(undefined);

const Login = ({authenticator, children}: PropsWithChildren<LoginProps>) => {
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
    return <LoggedInUserContext.Provider value={currentUser}>
      {children}
      </LoggedInUserContext.Provider>;
  }

  return <Button basic size="large" onClick={() => { authenticator.signInWithRedirect() }}>
    <Icon name="google" />
    Sign in
  </Button>;
}

Login.LoggedInUserContext = LoggedInUserContext;

export default Login;

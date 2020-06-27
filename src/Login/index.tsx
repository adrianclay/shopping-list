import React, {useEffect, useState, PropsWithChildren} from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import User from "../domain/User";

export interface Authenticator {
  onAuthStateChanged: (onUpdate: (currentUser: User | null) => void) => void;
  signInWithRedirect: () => void
}

export const LoggedInUserContext = React.createContext<User|undefined>(undefined);

function LoginConstructor(authenticator: Authenticator) {

  const Login = ({children}: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User|null|undefined>(undefined);

    useEffect(() => {
      authenticator.onAuthStateChanged((currentUser) => {
        setCurrentUser(currentUser);
      });
    }, [])


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

  return Login;
}

export default LoginConstructor;

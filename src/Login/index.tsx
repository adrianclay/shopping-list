import React, {FunctionComponent, useEffect, useState} from "react";

export interface User {
  displayName: string | null;
  uid: string;
}

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
    return <p>Loading</p>;
  }

  if (currentUser) {
    return <div>{children}</div>;
  }

  return <button onClick={() => { authenticator.signInWithRedirect() }}>
    Please login
  </button>;
}

export default Login;

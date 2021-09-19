import {render, Matcher} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import User from "../domain/User";
import LoginConstructor, { LoggedInUserContext } from "./";

function changeAuthState(currentUser: User | null) {
  act(() => {
    onAuthStateChangedOnUpdateCallback(currentUser);
  });
}

let onAuthStateChangedOnUpdateCallback: (currentUser: User | null) => void

const authenticatorMock = () => {
  return {
    onAuthStateChanged: (onUpdate: (currentUser: User | null) => void) => {
      onAuthStateChangedOnUpdateCallback = onUpdate;
    },
    signInWithRedirect: signInWithRedirect
  }
}

let findByText: (id: Matcher) => Promise<HTMLElement>;
let signInWithRedirect: jest.Mock;

beforeEach(() => {
  signInWithRedirect = jest.fn();
  const Login = LoginConstructor(authenticatorMock());
  const component = <Login>
    Secret message for logged in users
    <LoggedInUserContext.Consumer>
      {loggedInUser => `${loggedInUser?.displayName} with ID ${loggedInUser?.uid} logged in`}
    </LoggedInUserContext.Consumer>
  </Login>
  findByText = render(component).findByText;
})

test('displays loading message if no auth state has been provided by firebase', async () => {
  expect(await findByText(/loading/i)).toBeInTheDocument();
})

describe('logged in', () => {
  beforeEach(() => {
    changeAuthState({
      displayName: 'Adrian',
      uid: '1001',
    });
  });

  test('displays children', async () => {
    expect(await findByText(/secret message/i)).toBeInTheDocument();
  });

  test('populates LoggedInUserContext with the user', async () => {
    expect(await findByText(/Adrian with ID 1001 logged in/)).toBeInTheDocument();
  });
});

describe('not logged in', () => {
  beforeEach(() => {
    changeAuthState(null);
  })

  test('displays login button', async () => {
    expect(await findByText(/sign in/i)).toBeInTheDocument();
  });

  test('calls signInWithRedirect, on clicking the login button', async () => {
    (await findByText(/sign in/i)).click()

    expect(signInWithRedirect).toBeCalledWith()
  })
})

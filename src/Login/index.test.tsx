import React from "react";
import {render, Matcher} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import Login, {User} from "./";

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

  const component = <Login authenticator={authenticatorMock()}>
    Secret message for logged in users
  </Login>
  findByText = render(component).findByText;
})

test('displays loading message if no auth state has been provided by firebase', async () => {
  expect(await findByText(/loading/i)).toBeInTheDocument();
})

test('displays children if logged in', async () => {
  changeAuthState({
    displayName: 'Adrian',
    uid: '1001',
  });

  expect(await findByText(/secret message/i)).toBeInTheDocument();
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

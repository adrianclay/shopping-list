import React from 'react';
import {action} from '@storybook/addon-actions';

import Login from "./";
import User from '../domain/User';

function createLoginStory(onAuthStateChanged: (onUpdate: (user: User|null) => void) => void) {
  const authenticatorStub = {
    onAuthStateChanged,
    signInWithRedirect: action('signInWithRedirect')
  };

  return (<Login authenticator={authenticatorStub}>
    <p>This child node only gets rendered if you're authenticated</p>
  </Login>);
}

export default {
  title: 'Login',
  component: Login,
};

export const NotLoggedIn = () => createLoginStory((onUpdate) => {
  onUpdate(null);
});

export const LoggedIn = () => createLoginStory((onUpdate) => {
  onUpdate({ uid: '100', displayName: 'Fun' });
});

export const Loading = () => createLoginStory((onUpdate) => {
});

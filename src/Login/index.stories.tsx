import {action} from '@storybook/addon-actions';

import LoginConstructor from './';
import User from '../domain/User';

function createLoginStory(onAuthStateChanged: (onUpdate: (user: User|null) => void) => void) {
  const Login = LoginConstructor({
    onAuthStateChanged,
    signInWithRedirect: action('signInWithRedirect')
  });
  return (<Login>
    <p>This child node only gets rendered if you're authenticated</p>
  </Login>);
}

const LoginStories = {
  title: 'Login',
};
export default LoginStories;

export const NotLoggedIn = () => createLoginStory((onUpdate) => {
  onUpdate(null);
});

export const LoggedIn = () => createLoginStory((onUpdate) => {
  onUpdate({ uid: '100', displayName: 'Fun' });
});

export const Loading = () => createLoginStory((onUpdate) => {
});

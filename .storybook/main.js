module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
  typescript: {
    reactDocgen: 'none',
  },
};

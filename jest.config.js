
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
};

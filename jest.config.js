module.exports = {
  // Environment for testing Node.js applications
  testEnvironment: 'node',

  // Directory where Jest should output coverage reports
  coverageDirectory: 'coverage',

  // Reporters for coverage (Cobertura for SonarQube, lcov for local viewing)
  coverageReporters: ['cobertura', 'lcov', 'text'],

  // Files to collect coverage from
  collectCoverageFrom: [
    '**/*.js',              // Include all .js files
    '!**/node_modules/**',  // Exclude node_modules
    '!**/coverage/**',      // Exclude coverage output
    '!**/jest.config.js',   // Exclude this config file
    '!**/test/**',          // Exclude test files from coverage
  ],

  // Custom coverage thresholds (optional, adjust as needed)
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },

  // Pattern for test files
  testMatch: [
    '**/?(*.)+(spec|test).js', // Match files ending in .spec.js or .test.js
  ],

  // Transform files with Babel or other preprocessors (if used)
  transform: {
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JS files if you have Babel setup
  },

  // Mock files automatically
  moduleNameMapper: {
    '^axios$': 'axios', // Mock axios if needed, or use a custom mock
  },

  // Setup file to run before tests (e.g., for global mocks or setup)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: create this file for custom setup

  // Clear mocks between tests
  clearMocks: true,

  // Reset modules between tests
  resetModules: true,
};

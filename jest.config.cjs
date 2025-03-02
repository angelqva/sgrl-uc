const nextJest = require("next/jest"); // ✅ Use require() instead of import

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom", // Use "node" if testing backend code
  transform: {},
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Adjust alias mapping
  },
  setupFiles: ["<rootDir>/jest.setup.cjs"], // ✅ Load setup file correctly
};

module.exports = createJestConfig(customJestConfig);

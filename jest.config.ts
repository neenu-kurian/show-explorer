import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: "jsdom",
};

export default config;

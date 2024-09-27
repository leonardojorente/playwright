import playwright from 'eslint-plugin-playwright'
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

// install and config -> https://ceroshjacob.medium.com/setting-up-eslint-for-playwright-projects-with-typescript-12fab098bd94

export default [
  {
    files: [["**/*.ts", "**/*.tsx"],],
    plugins: {
      "@typescript-eslint": typescript,
      "playwright": playwright
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...playwright.configs['flat/recommended'],
      "no-console": "warn",
    },
  },
]
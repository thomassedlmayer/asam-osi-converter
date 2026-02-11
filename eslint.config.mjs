import lichtblick from "@lichtblick/eslint-plugin";

const tsFiles = ["**/*.ts", "**/*.tsx"];
const testFiles = ["tests/**/*.ts", "**/*.spec.ts", "**/*.test.ts"];

function applyFiles(configs, files) {
  return configs.map((config) => ({
    ...config,
    files: [...(config.files ?? []), ...files],
  }));
}

export default [
  {
    ignores: ["dist/**", "node_modules/**", ".yarn/**", "config.ts"],
  },
  ...applyFiles(lichtblick.configs.base, ["**/*.js", "**/*.mjs", "**/*.cjs", ...tsFiles]),
  ...applyFiles(lichtblick.configs.react, ["**/*.tsx"]),
  ...applyFiles(lichtblick.configs.typescript, tsFiles),
  ...applyFiles(lichtblick.configs.jest, testFiles),
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        projectService: false,
      },
    },
    rules: {
      "linebreak-style": ["error", "unix"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      // `@lichtblick/asam-osi-types` exports generated types that trigger false positives.
      "import/named": "off",
    },
  },
  {
    files: testFiles,
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

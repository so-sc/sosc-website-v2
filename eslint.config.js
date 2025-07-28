import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.astro/**",
      "**/public/**",
      "**/__tests__/**",
      "**/*.test.*",
      "**/*.spec.*",
      "**/vite.config.*",
      "**/astro.config.*",
      "**/*.config.*",
    ],
    rules: {
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-debugger": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "only-multiline"],
      "object-shorthand": ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-body-style": ["error", "as-needed"],
      "spaced-comment": ["warn", "always", { markers: ["/"] }],
      "keyword-spacing": ["error", { before: true, after: true }],

      "astro/no-unused-css-selector": "warn",
      "astro/no-set-html-directive": "warn",
      "astro/valid-compile": "error",
    },
  },
];

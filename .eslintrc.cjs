module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
  overrides: [],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
  },
  plugins: ["vue"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        // 不检查的组件的文件名
        ignores: ["index"],
      },
    ],
    "no-unused-vars": ["warn"],
    "vue/no-unused-vars": [
      "warn",
      {
        ignorePattern: "^_",
      },
    ],
  },
}

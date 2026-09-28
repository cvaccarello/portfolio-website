"use strict";

module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		extraFileExtensions: [".vue"],
		parser: "@babel/eslint-parser",
		requireConfigFile: false,
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["vue"],
	globals: {
		ParticleSystem: "readonly",
		ParticleEmitter: "readonly",
		skrollr: "readonly",
	},
	rules: {
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"vue/multi-word-component-names": "off",
	},
	overrides: [
		{
			files: ["*.vue"],
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@babel/eslint-parser",
				requireConfigFile: false,
			},
		},
		{
			files: [
				".eslintrc.cjs",
				".prettierrc.js",
				"vite.config.js",
				"*.config.js",
			],
			env: { node: true, browser: false },
		},
	],
	ignorePatterns: ["dist", "node_modules", "public/vendor"],
};

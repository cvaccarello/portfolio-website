'use strict';

module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	customSyntax: require('postcss-scss'),
	rules: {
		// Existing custom rules
		'at-rule-no-unknown': [
			true,
			{ ignoreAtRules: ['include', 'extend', 'use', 'for', 'if', 'each'] },
		],
		'function-no-unknown': [
			true,
			{ ignoreFunctions: ['nth', 'map-get', 'darken', 'lighten', 'saturate', 'append'] },
		],
		'annotation-no-unknown': null,
		'declaration-block-no-shorthand-property-overrides': null,
		'number-max-precision': null,
		'no-duplicate-selectors': null,
		'property-no-unknown': [true, { ignoreProperties: ['animation-timeline'] }],
		'no-descending-specificity': null,
		'declaration-block-no-duplicate-properties': null,
		'import-notation': null,

		// Disable modern color notation (allows legacy rgba/hsla format)
		'color-function-notation': null,

		// Disable percentage alpha value enforcement (allows decimals like 0.75 or 0.8)
		'alpha-value-notation': null,

		// Disable quotes rule on font family names (allows quoted "Roboto", "HelveticaNeue")
		'font-family-name-quotes': null,

		// Disable Prettier formatting errors in CSS/SCSS
		'prettier/prettier': null,
	},
};

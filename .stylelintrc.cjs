'use strict';

module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	customSyntax: require('postcss-scss'),
	rules: {
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
	},
};

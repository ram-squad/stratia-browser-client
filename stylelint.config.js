export default {
	overrides: [
		{
			customSyntax: "postcss-html",
			files: ["**/*.svelte"],
		},
	],
	plugins: ["stylelint-order", "stylelint-scss"],
	reportDescriptionlessDisables: true,
	reportInvalidScopeDisables: true,
	reportNeedlessDisables: true,
	rules: {
		"alpha-value-notation": [
			"number",
			{
				exceptProperties: [],
				severity: "warning",
			},
		],
		"annotation-no-unknown": [
			true,
			{
				ignoreAnnotations: ["default"],
				severity: "error",
			},
		],
		"at-rule-empty-line-before": [
			"always",
			{
				except: [],
				ignore: [],
				ignoreAtRules: [],
				severity: "error",
			},
		],
		"at-rule-no-vendor-prefix": [
			true,
			{
				severity: "error",
			},
		],
		"block-no-empty": [
			true,
			{
				ignore: [],
				severity: "error",
			},
		],
		"color-function-notation": [
			"modern",
			{
				ignore: [],
				severity: "error",
			},
		],
		"color-hex-alpha": [
			"always",
			{
				severity: "warning",
			},
		],
		"color-hex-length": [
			"long",
			{
				severity: "warning",
			},
		],
		"color-named": [
			"never",
			{
				ignore: [],
				ignoreProperties: [],
				severity: "error",
			},
		],
		"color-no-hex": [
			true,
			{
				severity: "warning",
			},
		],
		"color-no-invalid-hex": [
			true,
			{
				severity: "error",
			},
		],
		"comment-empty-line-before": [
			"always",
			{
				except: [],
				ignore: [],
				ignoreComments: [],
				severity: "error",
			},
		],
		"comment-whitespace-inside": [
			"always",
			{
				severity: "error",
			},
		],
		"custom-property-empty-line-before": [
			"never",
			{
				except: [],
				ignore: [],
				severity: "error",
			},
		],
		"custom-property-no-missing-var-function": [
			true,
			{
				severity: "error",
			},
		],
		"declaration-block-no-duplicate-custom-properties": [
			true,
			{
				ignoreProperties: [],
				severity: "error",
			},
		],
		"declaration-block-no-duplicate-properties": [
			true,
			{
				ignore: [],
				ignoreProperties: [],
				severity: "error",
			},
		],
		"declaration-block-no-redundant-longhand-properties": [
			true,
			{
				severity: "warning",
			},
		],
		"declaration-block-no-shorthand-property-overrides": [
			true,
			{
				severity: "error",
			},
		],
		"declaration-empty-line-before": [
			"never",
			{
				except: [],
				ignore: [],
				severity: "error",
			},
		],
		"declaration-no-important": [
			true,
			{
				severity: "error",
			},
		],
		"font-family-name-quotes": [
			"always-unless-keyword",
			{
				severity: "error",
			},
		],
		"font-family-no-duplicate-names": [
			true,
			{
				ignoreFontFamilyNames: [],
				severity: "error",
			},
		],
		"font-family-no-missing-generic-family-keyword": [
			true,
			{
				severity: "error",
			},
		],
		"font-weight-notation": [
			"numeric",
			{
				ignore: [],
				severity: "error",
			},
		],
		"function-calc-no-unspaced-operator": [
			true,
			{
				severity: "error",
			},
		],
		"function-linear-gradient-no-nonstandard-direction": [
			true,
			{
				severity: "error",
			},
		],
		"function-name-case": [
			"lower",
			{
				ignoreFunctions: [],
				severity: "error",
			},
		],
		"function-url-no-scheme-relative": [
			true,
			{
				severity: "error",
			},
		],
		"function-url-quotes": [
			"always",
			{
				except: [],
				severity: "error",
			},
		],
		"hue-degree-notation": [
			"angle",
			{
				severity: "error",
			},
		],
		"import-notation": [
			"url",
			{
				severity: "error",
			},
		],
		"keyframe-block-no-duplicate-selectors": [
			true,
			{
				severity: "error",
			},
		],
		"keyframe-declaration-no-important": [
			true,
			{
				severity: "error",
			},
		],
		"keyframe-selector-notation": [
			"percentage",
			{
				severity: "error",
			},
		],
		"length-zero-no-unit": [
			true,
			{
				ignore: [],
				ignoreFunctions: [],
				severity: "error",
			},
		],
		"media-feature-name-no-unknown": [
			true,
			{
				ignoreMediaFeatureNames: [],
				severity: "error",
			},
		],
		"media-feature-name-no-vendor-prefix": [
			true,
			{
				severity: "error",
			},
		],
		"media-feature-name-value-no-unknown": [
			true,
			{
				severity: "error",
			},
		],
		"media-feature-range-notation": [
			"context",
			{
				severity: "error",
			},
		],
		"media-query-no-invalid": [
			true,
			{
				severity: "error",
			},
		],
		"named-grid-areas-no-invalid": [
			true,
			{
				severity: "error",
			},
		],
		"no-descending-specificity": [
			true,
			{
				ignore: [],
				severity: "error",
			},
		],
		"no-duplicate-at-import-rules": [
			true,
			{
				severity: "error",
			},
		],
		"no-duplicate-selectors": [
			true,
			{
				disallowInList: false,
				severity: "error",
			},
		],
		"no-empty-source": [
			true,
			{
				severity: "error",
			},
		],
		"no-invalid-double-slash-comments": [
			true,
			{
				severity: "error",
			},
		],
		"no-invalid-position-at-import-rule": [
			true,
			{
				ignoreAtRules: [],
				severity: "error",
			},
		],
		"no-irregular-whitespace": [
			true,
			{
				severity: "error",
			},
		],
		"no-unknown-animations": [
			true,
			{
				severity: "error",
			},
		],
		"no-unknown-custom-properties": [
			true,
			{
				severity: "error",
			},
		],
		"order/properties-alphabetical-order": [
			true,
			{
				severity: "warning",
			},
		],
		"property-no-vendor-prefix": [
			true,
			{
				severity: "error",
			},
		],
		"rule-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: [],
				severity: "error",
			},
		],
		"scss/at-each-key-value-single-line": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/at-extend-no-missing-placeholder": [
			true,
			{
				severity: "error",
			},
		],
		"scss/at-function-named-arguments": [
			"always",
			{
				ignore: [],
				ignoreFunctions: [],
				severity: "warning",
			},
		],
		"scss/at-import-partial-extension": [
			"always",
			{
				severity: "error",
			},
		],
		"scss/at-mixin-argumentless-call-parentheses": [
			"always",
			{
				severity: "warning",
			},
		],
		"scss/at-mixin-named-arguments": [
			"always",
			{
				ignore: [],
				severity: "warning",
			},
		],
		"scss/at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [],
				severity: "error",
			},
		],
		"scss/at-use-no-unnamespaced": [
			true,
			{
				severity: "error",
			},
		],
		"scss/block-no-redundant-nesting": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/comment-no-empty": [
			true,
			{
				severity: "error",
			},
		],
		"scss/declaration-nested-properties": [
			"never",
			{
				except: [],
				severity: "warning",
			},
		],
		"scss/declaration-nested-properties-no-divided-groups": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/dimension-no-non-numeric-values": [
			true,
			{
				severity: "error",
			},
		],
		"scss/dollar-variable-colon-newline-after": [
			"always-multi-line",
			{
				severity: "warning",
			},
		],
		"scss/dollar-variable-default": [
			true,
			{
				severity: "error",
			},
		],
		"scss/dollar-variable-empty-line-after": [
			"always",
			{
				disableFix: false,
				except: ["last-nested", "before-comment", "before-dollar-variable"],
				ignore: [],
				severity: "warning",
			},
		],
		"scss/dollar-variable-empty-line-before": [
			"always",
			{
				disableFix: false,
				except: ["first-nested", "after-comment", "after-dollar-variable"],
				ignore: [],
				severity: "warning",
			},
		],
		"scss/dollar-variable-first-in-block": [
			true,
			{
				except: [],
				ignore: [],
				severity: "error",
			},
		],
		"scss/dollar-variable-no-missing-interpolation": [
			true,
			{
				severity: "error",
			},
		],
		"scss/dollar-variable-no-namespaced-assignment": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/double-slash-comment-inline": [
			"never",
			{
				ignore: [],
				severity: "warning",
			},
		],
		"scss/double-slash-comment-whitespace-inside": [
			"always",
			{
				severity: "warning",
			},
		],
		"scss/function-calculation-no-interpolation": [
			true,
			{
				severity: "error",
			},
		],
		"scss/function-color-relative": [
			true,
			{
				severity: "error",
			},
		],
		"scss/function-no-unknown": [
			true,
			{
				ignoreFunctions: [],
				severity: "error",
			},
		],
		"scss/function-quote-no-quoted-strings-inside": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/function-unquote-no-unquoted-strings-inside": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/load-no-partial-leading-underscore": [
			true,
			{
				severity: "warning",
			},
		],
		"scss/map-keys-quotes": [
			"always",
			{
				severity: "error",
			},
		],
		"scss/no-duplicate-dollar-variables": [
			true,
			{
				ignoreDefaults: false,
				ignoreInside: [],
				ignoreInsideAtRules: [],
				severity: "error",
			},
		],
		"scss/no-duplicate-mixins": [
			true,
			{
				severity: "error",
			},
		],
		"scss/no-global-function-names": [
			true,
			{
				severity: "error",
			},
		],
		"scss/property-no-unknown": [
			true,
			{
				checkPrefixed: true,
				ignoreAtRules: [],
				ignoreProperties: [],
				ignoreSelectors: [],
				severity: "error",
			},
		],
		"scss/selector-nest-combinators": [
			"always",
			{
				severity: "warning",
			},
		],
		"scss/selector-no-redundant-nesting-selector": [
			true,
			{
				ignoreKeywords: [],
				severity: "warning",
			},
		],
		"scss/selector-no-union-class-name": [
			true,
			{
				severity: "warning",
			},
		],
		"selector-anb-no-unmatchable": [
			true,
			{
				severity: "error",
			},
		],
		"selector-attribute-quotes": [
			"always",
			{
				severity: "error",
			},
		],
		"selector-no-qualifying-type": [
			true,
			{
				ignore: [],
				severity: "error",
			},
		],
		"selector-no-vendor-prefix": [
			true,
			{
				ignoreSelectors: [],
				severity: "error",
			},
		],
		"selector-not-notation": [
			"complex",
			{
				severity: "error",
			},
		],
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: [],
				severity: "error",
			},
		],
		"selector-pseudo-element-colon-notation": [
			"double",
			{
				severity: "error",
			},
		],
		"selector-pseudo-element-no-unknown": [
			true,
			{
				ignorePseudoElements: [],
				severity: "error",
			},
		],
		"selector-type-case": [
			"lower",
			{
				ignoreTypes: [],
				severity: "error",
			},
		],
		"selector-type-no-unknown": [
			true,
			{
				ignore: [],
				ignoreNamespaces: [],
				ignoreTypes: [],
				severity: "error",
			},
		],
		"shorthand-property-no-redundant-values": [
			true,
			{
				severity: "warning",
			},
		],
		"string-no-newline": [
			true,
			{
				severity: "error",
			},
		],
		"unit-no-unknown": [
			true,
			{
				ignoreFunctions: [],
				ignoreUnits: [],
				severity: "error",
			},
		],
		"value-keyword-case": [
			"lower",
			{
				ignoreKeywords: [],
				severity: "error",
			},
		],
		"value-no-vendor-prefix": [
			true,
			{
				ignoreValues: [],
				severity: "error",
			},
		],
	},
};

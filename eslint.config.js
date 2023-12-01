// https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new
// https://eslint.org/blog/2022/08/new-config-system-part-1/
// https://eslint.org/blog/2022/08/new-config-system-part-2/

// @ts-expect-error - Satisfying TypeSript here would actually cause ESLint to load the config incorrectly.
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
// @ts-expect-error - Needs Node 16 module resolution, but we can't use that because of SvelteKit.
import * as typescriptEslintParser from "@typescript-eslint/parser";
// @ts-expect-error - No types available.
import importEslintPlugin from "eslint-plugin-import";
import * as svelteEslintPlugin from "eslint-plugin-svelte";
import * as svelteEslintParser from "svelte-eslint-parser";

export default [
	{
		files: ["**/*.mjs", "**/*.js", "**/*.ts", "**/*.svelte"],
		languageOptions: {
			sourceType: "module",
		},
	},
	{
		files: ["**/*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
		},
	},
	{
		files: ["**/*.ts", "**/*.js", "**/*.cjs", "**/*.mjs"],
		languageOptions: {
			ecmaVersion: 13,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			parser: typescriptEslintParser,
			parserOptions: {
				extraFileExtensions: [".svelte"],
				project: "./tsconfig.json",
				tsconfigRootDir: ".",
			},
		},
	},
	{
		plugins: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			"@typescript-eslint": typescriptEslintPlugin,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			import: importEslintPlugin,
		},
		rules: {
			"@typescript-eslint/adjacent-overload-signatures": "error",
			"@typescript-eslint/array-type": [
				"error",
				{
					default: "array",
				},
			],
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/ban-ts-comment": "error",
			"@typescript-eslint/ban-tslint-comment": "error",
			"@typescript-eslint/ban-types": "error",
			"@typescript-eslint/block-spacing": "off",
			"@typescript-eslint/brace-style": "off",
			"@typescript-eslint/class-literal-property-style": ["error", "fields"],
			"@typescript-eslint/comma-dangle": "off",
			"@typescript-eslint/comma-spacing": "off",
			"@typescript-eslint/consistent-generic-constructors": "off",
			"@typescript-eslint/consistent-indexed-object-style": ["warn", "index-signature"],
			"@typescript-eslint/consistent-type-assertions": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/consistent-type-exports": [
				"error",
				{
					fixMixedExportsWithInlineTypeSpecifier: true,
				},
			],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					fixStyle: "separate-type-imports",
					prefer: "type-imports",
				},
			],
			"@typescript-eslint/default-param-last": "off",
			"@typescript-eslint/dot-notation": [
				"error",
				{
					allowIndexSignaturePropertyAccess: false,
					allowPrivateClassPropertyAccess: false,
					allowProtectedClassPropertyAccess: false,
				},
			],
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{
					accessibility: "explicit",
				},
			],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/func-call-spacing": "off",
			"@typescript-eslint/indent": "off",
			"@typescript-eslint/init-declarations": ["error", "always"],
			"@typescript-eslint/key-spacing": "off",
			"@typescript-eslint/keyword-spacing": "off",
			"@typescript-eslint/lines-around-comment": "off",
			"@typescript-eslint/lines-between-class-members": "off",
			"@typescript-eslint/member-delimiter-style": "off",
			"@typescript-eslint/member-ordering": [
				"warn",
				{
					classExpressions: {
						order: "alphabetically",
					},
					classes: {
						order: "alphabetically",
					},
					default: {
						order: "alphabetically",
					},
					interfaces: {
						order: "alphabetically",
					},
					typeLiterals: {
						order: "alphabetically",
					},
				},
			],
			"@typescript-eslint/method-signature-style": "off",
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-array-constructor": "error",
			"@typescript-eslint/no-base-to-string": "error",
			"@typescript-eslint/no-confusing-non-null-assertion": "error",
			"@typescript-eslint/no-confusing-void-expression": "error",
			"@typescript-eslint/no-dupe-class-members": "error",
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-duplicate-type-constituents": "error",
			"@typescript-eslint/no-dynamic-delete": "error",
			"@typescript-eslint/no-empty-function": [
				"error",
				{
					allow: [],
				},
			],
			"@typescript-eslint/no-empty-interface": [
				"error",
				{
					allowSingleExtends: true,
				},
			],
			"@typescript-eslint/no-explicit-any": [
				"error",
				{
					fixToUnknown: false,
					ignoreRestArgs: false,
				},
			],
			"@typescript-eslint/no-extra-non-null-assertion": "error",
			"@typescript-eslint/no-extra-parens": "off",
			"@typescript-eslint/no-extra-semi": "off",
			"@typescript-eslint/no-extraneous-class": [
				"error",
				{
					allowConstructorOnly: false,
					allowEmpty: false,
					allowStaticOnly: false,
					allowWithDecorator: false,
				},
			],
			"@typescript-eslint/no-floating-promises": [
				"error",
				{
					ignoreIIFE: false,
					ignoreVoid: false,
				},
			],
			"@typescript-eslint/no-for-in-array": "error",
			"@typescript-eslint/no-implied-eval": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-inferrable-types": [
				"error",
				{
					ignoreParameters: false,
					ignoreProperties: false,
				},
			],
			"@typescript-eslint/no-invalid-this": "off",
			"@typescript-eslint/no-invalid-void-type": [
				"error",
				{
					allowAsThisParameter: false,
					allowInGenericTypeArguments: true,
				},
			],
			"@typescript-eslint/no-loop-func": "error",
			"@typescript-eslint/no-loss-of-precision": "error",
			"@typescript-eslint/no-magic-numbers": "off",
			"@typescript-eslint/no-meaningless-void-operator": [
				"error",
				{
					checkNever: true,
				},
			],
			"@typescript-eslint/no-misused-new": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/no-mixed-enums": "error",
			"@typescript-eslint/no-namespace": [
				"error",
				{
					allowDeclarations: false,
					allowDefinitionFiles: false,
				},
			],
			"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
			"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-redeclare": [
				"error",
				{
					builtinGlobals: true,
					ignoreDeclarationMerge: false,
				},
			],
			"@typescript-eslint/no-redundant-type-constituents": "error",
			"@typescript-eslint/no-require-imports": "error",
			"@typescript-eslint/no-restricted-imports": "off",
			"@typescript-eslint/no-shadow": [
				"error",
				{
					allow: ["_"],
					builtinGlobals: true,
					hoist: "all",
					ignoreFunctionTypeParameterNameValueShadow: false,
					ignoreOnInitialization: true,
					ignoreTypeValueShadow: false,
				},
			],
			"@typescript-eslint/no-this-alias": "error",
			"@typescript-eslint/no-throw-literal": [
				"error",
				{
					allowThrowingAny: false,
					allowThrowingUnknown: true,
				},
			],
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": [
				"error",
				{
					allowComparingNullableBooleansToFalse: false,
					allowComparingNullableBooleansToTrue: false,
				},
			],
			"@typescript-eslint/no-unnecessary-condition": [
				"error",
				{
					allowConstantLoopConditions: false,
					allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
				},
			],
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/no-unnecessary-type-arguments": "error",
			"@typescript-eslint/no-unnecessary-type-assertion": "error",
			"@typescript-eslint/no-unnecessary-type-constraint": "error",
			"@typescript-eslint/no-unsafe-argument": "error",
			"@typescript-eslint/no-unsafe-assignment": "error",
			"@typescript-eslint/no-unsafe-call": "error",
			"@typescript-eslint/no-unsafe-declaration-merging": "error",
			"@typescript-eslint/no-unsafe-enum-comparison": "error",
			"@typescript-eslint/no-unsafe-member-access": "error",
			"@typescript-eslint/no-unsafe-return": "error",
			"@typescript-eslint/no-unused-expressions": [
				"warn",
				{
					allowShortCircuit: false,
					allowTaggedTemplates: false,
					allowTernary: false,
					enforceForJSX: true,
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					caughtErrors: "all",
					ignoreRestSiblings: false,
					vars: "all",
				},
			],
			"@typescript-eslint/no-use-before-define": [
				"error",
				{
					allowNamedExports: false,
					classes: true,
					enums: true,
					functions: true,
					ignoreTypeReferences: false,
					typedefs: true,
					variables: true,
				},
			],
			"@typescript-eslint/no-useless-constructor": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/no-var-requires": "error",
			"@typescript-eslint/non-nullable-type-assertion-style": "error",
			"@typescript-eslint/object-curly-spacing": "off",
			"@typescript-eslint/padding-line-between-statements": "off",
			"@typescript-eslint/parameter-properties": [
				"error",
				{
					allow: [],
					prefer: "class-property",
				},
			],
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/prefer-enum-initializers": "error",
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/prefer-includes": "error",
			"@typescript-eslint/prefer-literal-enum-member": [
				"error",
				{
					allowBitwiseExpressions: false,
				},
			],
			"@typescript-eslint/prefer-namespace-keyword": "error",
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{
					allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
					ignoreConditionalTests: false,
					ignoreMixedLogicalExpressions: false,
					ignoreTernaryTests: false,
					// "ignorePrimitives": {
					// 	"bigint": false,
					// 	"boolean": false,
					// 	"number": false,
					// 	"string": false,
					// },
				},
			],
			"@typescript-eslint/prefer-optional-chain": [
				"error",
				// {
				// 	"allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing": false,
				// 	"checkAny": true,
				// 	"checkUnknown": true,
				// 	"checkString": true,
				// 	"checkNumber": true,
				// 	"checkBoolean": true,
				// 	"checkBigInt": true,
				// 	"requireNullish": false,
				// },
			],
			"@typescript-eslint/prefer-readonly": [
				"error",
				{
					onlyInlineLambdas: false,
				},
			],
			"@typescript-eslint/prefer-readonly-parameter-types": "off",
			"@typescript-eslint/prefer-reduce-type-parameter": "error",
			"@typescript-eslint/prefer-regexp-exec": "error",
			"@typescript-eslint/prefer-return-this-type": "error",
			"@typescript-eslint/prefer-string-starts-ends-with": "error",
			"@typescript-eslint/prefer-ts-expect-error": "error",
			"@typescript-eslint/promise-function-async": [
				"error",
				{
					allowAny: true,
					allowedPromiseNames: [],
					checkArrowFunctions: true,
					checkFunctionDeclarations: true,
					checkFunctionExpressions: true,
					checkMethodDeclarations: true,
				},
			],
			"@typescript-eslint/quotes": "off",
			"@typescript-eslint/require-array-sort-compare": [
				"error",
				{
					ignoreStringArrays: false,
				},
			],
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/restrict-plus-operands": [
				"error",
				{
					allowAny: false,
					// "allowBoolean": false,
					// "allowNullish": false,
					// "allowNumberAndString": false,
					// "allowRegExp": false,
					// "skipCompoundAssignments": false,
				},
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowAny: false,
					allowBoolean: false,
					allowNever: false,
					allowNullish: false,
					allowNumber: false,
					allowRegExp: false,
				},
			],
			"@typescript-eslint/return-await": "off",
			"@typescript-eslint/semi": "off",
			"@typescript-eslint/sort-type-constituents": [
				"warn",
				{
					checkIntersections: true,
					/* "checkUnionTypes": true, */ groupOrder: [],
				},
			],
			"@typescript-eslint/space-before-blocks": "off",
			"@typescript-eslint/space-before-function-paren": "off",
			"@typescript-eslint/space-infix-ops": "off",
			"@typescript-eslint/strict-boolean-expressions": [
				"error",
				{
					allowAny: false,
					allowNullableBoolean: false,
					allowNullableEnum: false,
					allowNullableNumber: false,
					allowNullableObject: false,
					allowNullableString: false,
					allowNumber: false,
					allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
					allowString: false,
				},
			],
			"@typescript-eslint/switch-exhaustiveness-check": "off",
			"@typescript-eslint/triple-slash-reference": [
				"error",
				{
					lib: "never",
					path: "never",
					types: "never",
				},
			],
			"@typescript-eslint/type-annotation-spacing": "off",
			"@typescript-eslint/typedef": [
				"error",
				{
					arrayDestructuring: false,
					arrowParameter: false,
					memberVariableDeclaration: false,
					objectDestructuring: false,
					parameter: false,
					propertyDeclaration: false,
					variableDeclaration: false,
					variableDeclarationIgnoreFunction: false,
				},
			],
			"@typescript-eslint/unbound-method": [
				"error",
				{
					ignoreStatic: false,
				},
			],
			"@typescript-eslint/unified-signatures": [
				"error",
				{
					ignoreDifferentlyNamedParameters: false,
				},
			],
			"accessor-pairs": "error",
			"array-callback-return": "off",
			"arrow-body-style": "off",
			"block-scoped-var": "error",
			"block-spacing": "off",
			"brace-style": "off",
			// "class-methods-use-this": "off",
			// "@typescript-eslint/class-methods-use-this": [
			// 	"error",
			// 	{"ignoreOverrideMethods": false, "ignoreClassesThatImplementAnInterface": false},
			// ],
			camelcase: "off",
			"capitalized-comments": "off",
			"class-methods-use-this": "error",
			"comma-dangle": "off",
			"comma-spacing": "off",
			complexity: "off",
			"consistent-return": "error",
			"consistent-this": "off",
			"constructor-super": "error",
			curly: ["warn", "all"],
			"default-case": "off",
			"default-case-last": "off",
			"default-param-last": "off",
			"dot-notation": "off",
			eqeqeq: [
				"error",
				"always",
				{
					null: "ignore",
				},
			],
			"for-direction": "error",
			"func-call-spacing": "off",
			"func-name-matching": "off",
			"func-names": "off",
			"func-style": "off",
			"getter-return": "error",
			"grouped-accessor-pairs": "error",
			"guard-for-in": "off",
			"id-denylist": "off",
			"id-length": "off",
			"id-match": "off",
			// TypeScript will handle this.
			"import/consistent-type-specifier-style": "off",
			// Doesn't work correctly with TypeScript.
			"import/default": "off",
			"import/dynamic-import-chunkname": "off",
			"import/export": "error",
			"import/exports-last": "warn",
			"import/extensions": "off", // TypeScript will handle this.
			"import/first": "warn",
			"import/group-exports": "off",
			"import/max-dependencies": "off",
			// TypeScript has this functionality.
			"import/named": "off",
			// Doesn't work correctly with TypeScript.
			"import/namespace": "off",
			"import/newline-after-import": [
				"warn",
				{
					considerComments: false,
					count: 1,
					exactCount: false,
				},
			],
			"import/no-absolute-path": [
				"error",
				{
					amd: true,
					commonjs: true,
					esmodule: true,
				},
			],
			"import/no-amd": "error",
			"import/no-anonymous-default-export": "off",
			// The Prettier config uses CommonJS.
			"import/no-commonjs": "off",
			"import/no-cycle": [
				"error",
				{
					allowUnsafeDynamicCyclicDependency: false,
					ignoreExternal: false,
					maxDepth: Infinity,
				},
			],
			"import/no-default-export": "warn",
			// Doesn't work correctly with TypeScript.
			"import/no-deprecated": "off",
			"import/no-duplicates": [
				"warn",
				{
					considerQueryString: false,
					"prefer-inline": true,
				},
			],
			"import/no-dynamic-require": "error",
			"import/no-empty-named-blocks": "error",
			// Doesn't work correctly with SvelteKit.
			"import/no-extraneous-dependencies": "off",
			"import/no-import-module-exports": [
				"error",
				{
					exceptions: [],
				},
			],
			"import/no-internal-modules": "off",
			"import/no-mutable-exports": "error",
			// Doesn't work correctly with TypeScript.
			"import/no-named-as-default": "off",
			// Doesn't work correctly with TypeScript.
			"import/no-named-as-default-member": "off",
			"import/no-named-default": "error",
			"import/no-named-export": "off",
			"import/no-namespace": "off",
			"import/no-nodejs-modules": "off",
			"import/no-relative-packages": "off",
			"import/no-relative-parent-imports": "off",
			"import/no-restricted-paths": "off",
			"import/no-self-import": "error",
			"import/no-unassigned-import": [
				"error",
				{
					allow: [],
				},
			],
			"import/no-unresolved": "off",
			// Doesn't work correctly.
			"import/no-unused-modules": "off",
			"import/no-useless-path-segments": [
				"warn",
				{
					commonjs: true,
					noUselessIndex: true,
				},
			],
			"import/no-webpack-loader-syntax": "error",
			"import/order": [
				"warn",
				{
					alphabetize: {
						caseInsensitive: false,
						order: "asc",
						orderImportKind: "asc",
					},
					distinctGroup: false,
					groups: [],
					"newlines-between": "never",
					pathGroups: [],
					pathGroupsExcludedImportTypes: [],
					warnOnUnassignedImports: true,
				},
			],
			"import/prefer-default-export": "off",
			"import/unambiguous": "error",
			indent: "off",
			"init-declarations": "off",
			"key-spacing": "off",
			"keyword-spacing": "off",
			"lines-around-comment": "off",
			"lines-between-class-members": "off",
			"logical-assignment-operators": "off",
			"max-classes-per-file": ["error", 1],
			"max-depth": "off",
			"max-lines": "off",
			"max-lines-per-function": "off",
			"max-nested-callbacks": "off",
			"max-params": "off",
			"max-statements": "off",
			"multiline-comment-style": "off",
			"new-cap": "off",
			"no-alert": "off",
			"no-array-constructor": "off",
			"no-async-promise-executor": "error",
			"no-await-in-loop": "off",
			"no-bitwise": "off",
			"no-caller": "error",
			"no-case-declarations": "off",
			"no-class-assign": "error",
			"no-compare-neg-zero": "error",
			"no-cond-assign": "error",
			"no-confusing-arrow": "off",
			"no-console": "off",
			"no-const-assign": "error",
			"no-constant-binary-expression": "error",
			"no-constant-condition": "error",
			"no-constructor-return": "error",
			"no-continue": "off",
			"no-control-regex": "off",
			"no-debugger": "error",
			"no-delete-var": "error",
			"no-div-regex": "off",
			"no-dupe-args": "error",
			"no-dupe-class-members": "off",
			"no-dupe-else-if": "error",
			"no-dupe-keys": "error",
			"no-duplicate-case": "error",
			"no-duplicate-imports": [
				"error",
				{
					includeExports: true,
				},
			],
			"no-else-return": [
				"error",
				{
					allowElseIf: false,
				},
			],
			"no-empty": "error",
			"no-empty-character-class": "error",
			"no-empty-function": "off",
			"no-empty-pattern": "error",
			"no-empty-static-block": "error",
			"no-eq-null": "off",
			"no-eval": "error",
			"no-ex-assign": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",
			"no-extra-boolean-cast": [
				"error",
				{
					enforceForLogicalOperands: true,
				},
			],
			"no-extra-label": "error",
			"no-extra-parens": "off",
			"no-extra-semi": "off",
			"no-fallthrough": "off",
			"no-floating-decimal": "error",
			"no-func-assign": "error",
			"no-global-assign": "error",
			"no-implicit-coercion": "error",
			"no-implicit-globals": "error",
			"no-implied-eval": "off",
			"no-import-assign": "error",
			"no-inline-comments": "off",
			"no-inner-declarations": ["error", "both"],
			"no-invalid-regexp": "error",
			"no-invalid-this": "off",
			"no-irregular-whitespace": "error",
			"no-iterator": "error",
			"no-label-var": "error",
			"no-labels": "error",
			"no-lone-blocks": "error",
			"no-lonely-if": "error",
			"no-loop-func": "off",
			"no-loss-of-precision": "off",
			"no-magic-numbers": "off",
			"no-misleading-character-class": "error",
			"no-mixed-operators": "off",
			"no-multi-assign": [
				"error",
				{
					ignoreNonDeclaration: false,
				},
			],
			"no-multi-str": "error",
			"no-negated-condition": "error",
			"no-nested-ternary": "off",
			"no-new": "error",
			"no-new-func": "error",
			"no-new-native-nonconstructor": "error",
			"no-new-object": "off",
			"no-new-symbol": "error",
			"no-new-wrappers": "error",
			"no-nonoctal-decimal-escape": "error",
			"no-obj-calls": "error",
			"no-octal": "error",
			"no-octal-escape": "error",
			"no-param-reassign": [
				"error",
				{
					props: false,
				},
			],
			"no-plusplus": "off",
			"no-promise-executor-return": "error",
			"no-proto": "error",
			"no-prototype-builtins": "error",
			"no-redeclare": "off",
			"no-regex-spaces": "off",
			"no-restricted-exports": "off",
			"no-restricted-globals": "off",
			"no-restricted-imports": "off",
			"no-restricted-properties": "off",
			"no-restricted-syntax": "off",
			"no-return-assign": ["error", "always"],
			"no-script-url": "error",
			"no-self-assign": "error",
			"no-self-compare": "error",
			"no-sequences": [
				"error",
				{
					allowInParentheses: false,
				},
			],
			"no-setter-return": "error",
			"no-shadow": "off",
			"no-shadow-restricted-names": "error",
			"no-sparse-arrays": "error",
			"no-template-curly-in-string": "off",
			"no-ternary": "off",
			"no-this-before-super": "error",
			"no-throw-literal": "off",
			// We use TypeScript for that.
			"no-undef": "off",
			"no-undef-init": "error",
			"no-undefined": "off",
			"no-underscore-dangle": [
				"error",
				{
					allow: [],
					allowAfterSuper: false,
					allowAfterThis: false,
					allowAfterThisConstructor: false,
					allowFunctionParams: false,
					allowInArrayDestructuring: false,
					allowInObjectDestructuring: false,
					enforceInClassFields: false,
					enforceInMethodNames: false,
				},
			],
			"no-unexpected-multiline": "error",
			"no-unmodified-loop-condition": "error",
			"no-unneeded-ternary": [
				"error",
				{
					defaultAssignment: false,
				},
			],
			"no-unreachable": "error",
			"no-unreachable-loop": "error",
			"no-unsafe-finally": "error",
			"no-unsafe-negation": "error",
			"no-unsafe-optional-chaining": "error",
			"no-unused-expressions": "off",
			"no-unused-labels": "warn",
			"no-unused-private-class-members": "warn",
			"no-unused-vars": "off",
			"no-use-before-define": "off",
			"no-useless-backreference": "error",
			"no-useless-call": "error",
			"no-useless-catch": "warn",
			"no-useless-computed-key": [
				"warn",
				{
					enforceForClassMembers: true,
				},
			],
			"no-useless-concat": "warn",
			"no-useless-constructor": "off",
			"no-useless-escape": "warn",
			"no-useless-rename": [
				"warn",
				{
					ignoreDestructuring: false,
					ignoreExport: false,
					ignoreImport: false,
				},
			],
			"no-useless-return": "error",
			"no-var": "error",
			"no-void": [
				"error",
				{
					allowAsStatement: false,
				},
			],
			"no-warning-comments": "off",
			"no-with": "error",
			"object-curly-spacing": "off",
			"object-shorthand": [
				"error",
				"always",
				{
					avoidExplicitReturnArrows: false,
					avoidQuotes: false,
					ignoreConstructors: false,
				},
			],
			"one-var": ["warn", "never"],
			"one-var-declaration-per-line": "off",
			"operator-assignment": ["error", "always"],
			"padding-line-between-statements": "off",
			"prefer-arrow-callback": [
				"error",
				{
					allowNamedFunctions: false,
					allowUnboundThis: false,
				},
			],
			"prefer-const": [
				"warn",
				{
					destructuring: "any",
					ignoreReadBeforeAssign: false,
				},
			],
			"prefer-destructuring": [
				"error",
				{
					AssignmentExpression: {
						array: true,
						object: true,
					},
					VariableDeclarator: {
						array: true,
						object: true,
					},
				},
				{
					enforceForRenamedProperties: false,
				},
			],
			"prefer-exponentiation-operator": "error",
			"prefer-named-capture-group": "error",
			"prefer-numeric-literals": "error",
			"prefer-object-has-own": "error",
			"prefer-object-spread": "error",
			"prefer-promise-reject-errors": [
				"error",
				{
					allowEmptyReject: false,
				},
			],
			"prefer-regex-literals": [
				"error",
				{
					disallowRedundantWrapping: true,
				},
			],
			"prefer-rest-params": "error",
			"prefer-spread": "error",
			"prefer-template": "error",
			// Prettier will handle this.
			"quote-props": "off",
			quotes: "off",
			radix: ["error", "always"],
			"require-atomic-updates": "error",
			"require-await": "off",
			"require-unicode-regexp": "error",
			"require-yield": "error",
			"return-await": "off",
			semi: "off",
			// eslint-plugin-import will handle this.
			"sort-imports": "off",
			"sort-keys": [
				"warn",
				"asc",
				{
					allowLineSeparatedGroups: false,
					caseSensitive: true,
					minKeys: 2,
					natural: false,
				},
			],
			"sort-vars": [
				"warn",
				{
					ignoreCase: false,
				},
			],
			"space-before-blocks": "off",
			"space-before-function-paren": "off",
			"space-infix-ops": "off",
			"spaced-comment": ["error", "always"],
			// TypeScript has strict mode
			strict: "off",
			"symbol-description": "error",
			"use-isnan": "error",
			"valid-typeof": "error",
			"vars-on-top": "error",
			yoda: [
				"warn",
				"never",
				{
					exceptRange: false,
					onlyEquality: false,
				},
			],
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			ecmaVersion: 13,
			parser: svelteEslintParser,
			parserOptions: {
				extraFileExtensions: [".svelte"],
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				parser: typescriptEslintParser,
				project: "./tsconfig.json",
				tsconfigRootDir: ".",
			},
		},
		plugins: {
			svelte: svelteEslintPlugin,
		},
		rules: {
			// Props support.
			"@typescript-eslint/init-declarations": "off",
			// $$Slots support.
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					caughtErrors: "all",
					ignoreRestSiblings: false,
					vars: "all",
					varsIgnorePattern: "^\\$\\$Slots$",
				},
			],
			// Svelte props support.
			"import/no-mutable-exports": "off",
			// Props support.
			"init-declarations": "off",
			// $$Slots support.
			"no-unused-vars": "off",
			"svelte/block-lang": [
				"error",
				{
					enforceScriptPresent: false,
					enforceStylePresent: false,
					script: ["ts"],
					style: ["scss"],
				},
			],
			"svelte/button-has-type": [
				"error",
				{
					button: true,
					reset: true,
					submit: true,
				},
			],
			"svelte/comment-directive": [
				"error",
				{
					reportUnusedDisableDirectives: true,
				},
			],
			"svelte/derived-has-same-inputs-outputs": "error",
			"svelte/experimental-require-slot-types": "error",
			"svelte/experimental-require-strict-events": "error",
			"svelte/first-attribute-linebreak": "off",
			"svelte/html-closing-bracket-spacing": "off",
			"svelte/html-quotes": "off",
			"svelte/html-self-closing": "off",
			"svelte/indent": "off",
			"svelte/infinite-reactive-loop": "error",
			"svelte/max-attributes-per-line": "off",
			"svelte/mustache-spacing": "off",
			"svelte/no-at-debug-tags": "error",
			"svelte/no-at-html-tags": "error",
			"svelte/no-dom-manipulating": "error",
			"svelte/no-dupe-else-if-blocks": "error",
			"svelte/no-dupe-on-directives": "error",
			"svelte/no-dupe-style-properties": "error",
			"svelte/no-dupe-use-directives": "error",
			"svelte/no-dynamic-slot-name": "error",
			"svelte/no-export-load-in-svelte-module-in-kit-pages": "error",
			"svelte/no-extra-reactive-curlies": "error",
			"svelte/no-inner-declarations": ["error", "both"],
			"svelte/no-not-function-handler": "error",
			"svelte/no-object-in-text-mustaches": "error",
			"svelte/no-reactive-functions": "error",
			"svelte/no-reactive-literals": "error",
			"svelte/no-restricted-html-elements": "off",
			"svelte/no-shorthand-style-property-overrides": "error",
			"svelte/no-spaces-around-equal-signs-in-attribute": "off",
			"svelte/no-store-async": "error",
			"svelte/no-target-blank": [
				"error",
				{
					allowReferrer: false,
					enforceDynamicLinks: "always",
				},
			],
			"svelte/no-trailing-spaces": "off",
			"svelte/no-unknown-style-directive-property": [
				"error",
				{
					/* "ignoreProperties": [], */ ignorePrefixed: false,
				},
			],
			"svelte/no-unused-svelte-ignore": "error",
			"svelte/no-useless-mustaches": [
				"error",
				{
					ignoreIncludesComment: false,
					ignoreStringEscape: false,
				},
			],
			"svelte/prefer-class-directive": "error",
			"svelte/prefer-destructured-store-props": "error",
			"svelte/prefer-style-directive": "error",
			"svelte/require-event-dispatcher-types": "error",
			"svelte/require-optimized-style-attribute": "error",
			"svelte/require-store-callbacks-use-set-param": "error",
			"svelte/require-store-reactive-access": "error",
			"svelte/require-stores-init": "error",
			"svelte/shorthand-attribute": [
				"error",
				{
					prefer: "always",
				},
			],
			"svelte/shorthand-directive": [
				"error",
				{
					prefer: "always",
				},
			],
			"svelte/sort-attributes": [
				"warn",
				{
					order: [
						{
							match: "/.*/u",
							sort: "alphabetical",
						},
					],
				},
			],
			"svelte/spaced-html-comment": ["error", "always"],
			"svelte/system": "error",
			"svelte/valid-compile": [
				"error",
				{
					ignoreWarnings: false,
				},
			],
			// "svelte/no-reactive-reassign": ["error", {"props": true}],
			"svelte/valid-prop-names-in-kit-pages": "error",
			// "svelte/no-immutable-reactive-statements": "error",
			// "svelte/no-unused-class-name": ["warn", {"allowedClassNames": []}],
			// "svelte/require-each-key": "error",
			// "svelte/valid-each-key": "error",
		},
	},
	{
		ignores: [
			"**/.git/**",
			"**/.vscode/**",
			"**/node_modules/**",
			".svelte-kit/**",
			"build/**",
			"coverage-report/**",
			"dist/**",
			"src/assets/**",
		],
	},
];

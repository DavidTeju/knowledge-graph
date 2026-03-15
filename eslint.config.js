import { createConfig } from '@davidteju/dev-config/eslint';

export default [
	...(await createConfig({ framework: 'svelte' })),
	// Project-specific: expanded no-unused-vars patterns
	{
		rules: {
			'unused-imports/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			]
		}
	}
];

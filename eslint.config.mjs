// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { node } from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    { ignores: ['dist/*'] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    // @ts-ignore
    eslintConfigPrettier,
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            globals: node,
        },
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
    }
)

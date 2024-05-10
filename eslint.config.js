// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import global from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                ...global.node,
            },
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        ignores: ['dist/*'],
    }
)

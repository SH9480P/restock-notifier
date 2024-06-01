// @ts-check

const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const global = require('globals')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = tseslint.config(
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
    },
    {
        rules: { '@typescript-eslint/no-var-requires': 'off' },
    }
)

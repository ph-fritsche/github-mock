import config from '@ph.fritsche/eslint-config'

export default [
    ...config,
    {
        rules: {
            // https://github.com/eslint-stylistic/eslint-stylistic/issues/415
            '@stylistic/block-spacing': 'off',

            // @octokit/graphql-schema declares properties as `any`
            '@typescript-eslint/no-unsafe-assignment': 0,
            '@typescript-eslint/no-unsafe-argument': 0,
            '@typescript-eslint/no-unsafe-member-access': 0,
            '@typescript-eslint/no-unsafe-return': 0,
        },
    },
]

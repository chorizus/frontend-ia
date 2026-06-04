// stylelint.config.mjs
export default {
    extends: ['stylelint-config-standard'],
    ignoreFiles: [
        '**/node_modules/**',
        'default_shadcn_theme.css',
        'src/styles/**',
    ],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'theme',
                    'utility',
                    'variant',
                    'custom-variant',
                    'layer',
                    'apply',
                    'config'
                ]
            }
        ],
        'selector-class-pattern': [
            '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
            { message: 'Expected BEM class selector pattern' }
        ],
        'declaration-block-single-line-max-declarations': null,
        'no-descending-specificity': null,
    },
};
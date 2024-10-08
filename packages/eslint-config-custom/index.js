module.exports = {
  extends: ['next'],
  plugins: ['prefer-arrow-functions'],
  rules: {
    'react/jsx-curly-brace-presence': 2,
    'react/no-unescaped-entities': 'off',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'any',
        prev: '*',
        next: 'export',
      },
    ],
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],
  },
}

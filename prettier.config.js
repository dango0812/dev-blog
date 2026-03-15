/**@type{import("prettier").Config}*/

const functions = ['cn', 'clsx', 'cva'];
export default {
  // Used to sort classes in strings provided to function calls (clsx, twMerge or cva)
  tailwindFunctions: functions,
  // Used to wrap classes in strings provided to function calls (clsx, twMerge or cva)
  customFunctions: functions,
  // https://github.com/ony3000/prettier-plugin-classnames?tab=readme-ov-file#ending-position
  tailwindStylesheet: './app/globals.css',
  endingPosition: 'absolute',
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-classnames', 'prettier-plugin-merge'],
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};

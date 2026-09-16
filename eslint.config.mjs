import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';

const config = [
  {
    ignores: ['.next/**', '.netlify/**', 'node_modules/**', 'public/**', 'src/lotties/**'],
  },
  ...nextCoreWebVitals,
  prettier,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default config;

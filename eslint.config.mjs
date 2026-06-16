import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'src/lotties/**'],
  },
  ...nextCoreWebVitals,
  prettier,
];

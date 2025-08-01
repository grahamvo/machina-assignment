import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
          alias: {
              extensions: ['.jsx', '.js', '.ts', '.tsx', '.scss'],
              map: [
                  ['Components', './src/components/'],
                  ['Styles', './src/styles/'],
                  ['Assets', './src/assets'],
                  ['Pages', './src/pages'],
                  ['Context', './src/context/'],
                  ['Hooks', './src/hooks/'],
                  ['Routes', './src/routes/'],
                  ['Types', './src/types/'],
              ],
          },
      },
      'import/ignore': ['vite', '@vitejs/plugin-react'],
    },
  },
])

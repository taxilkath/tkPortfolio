import taxilkath, { GLOB_E2E, GLOB_TS, GLOB_TSX } from '@taxilkath/eslint-config'

export default taxilkath(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    react: true,
    next: true,
    playwright: true,
    testingLibrary: true,
    turbo: true,
    tailwindcss: true,
    tailwindcssConfig: {
      entryPoint: 'src/styles/globals.css',
      ignoreClasses: ['shiki']
    }
  },
  {
    files: [GLOB_E2E],
    rules: {
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['checkStoredTheme', 'checkAppliedTheme', 'a11y']
        }
      ]
    }
  },
  {
    files: [GLOB_TS, GLOB_TSX],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/components/link` instead.'
        },
        {
          name: 'next/navigation',
          importNames: ['usePathname', 'useRouter', 'redirect', 'permanentRedirect'],
          message: 'Please import from `@taxilkath/i18n/routing` instead.'
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='a']",
          message:
            'Using `<a>` elements directly is discouraged. Please use `<Link>` from `@/components/link` instead.'
        }
      ]
    }
  }
)

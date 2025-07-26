export const supportedLanguages = [
  {
    code: 'en',
    label: 'English',
    default: true
  },
  {
    code: 'hi',
    label: 'Hindi',
    default: false
  }
]

export const i18n = {
  locales: supportedLanguages.map(({ code }) => code),
  defaultLocale: supportedLanguages.find(({ default: isDefault }) => isDefault)?.code ?? 'en'
} as const

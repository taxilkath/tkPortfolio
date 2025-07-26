import taxilkath from '@taxilkathslint-config'

export default taxilkath({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  turbo: true
})

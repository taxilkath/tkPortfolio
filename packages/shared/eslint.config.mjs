import taxilkath from '@taxilkath/eslint-config'

export default taxilkath({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  turbo: true
})

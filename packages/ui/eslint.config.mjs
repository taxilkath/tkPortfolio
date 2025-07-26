import taxilkath from '@taxilkath/eslint-config'

export default taxilkath({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  react: true,
  next: true,
  turbo: true,
  tailwindcss: true,
  tailwindcssConfig: {
    entryPoint: 'src/styles.css'
  }
})

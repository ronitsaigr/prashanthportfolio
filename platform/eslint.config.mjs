import tseslint from 'typescript-eslint';
export default tseslint.config({ ignores: ['dist/**', '.astro/**', '.wrangler/**'] }, ...tseslint.configs.recommended);

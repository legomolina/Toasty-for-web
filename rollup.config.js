import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/scripts/ToastyWeb.ts',
		output: {
			name: 'ToastyWeb',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			typescript(),
			minify()
		]
	},
	{
		input: 'src/scripts/ToastyWeb.ts',
		plugins: [
			typescript(),
			minify()
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
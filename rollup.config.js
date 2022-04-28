import typescript from 'rollup-plugin-typescript2';
import babel  from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'
export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: './dist/index.umd.js',
                format: 'umd',
                name: 'tool-library'
            },
            {
                file: './dist/index.js',
                format: 'esm'
            }
        ],
        plugins: [
            typescript(),
            babel({
                exclude: 'node_modules/**'
            }),
            del({
                targets: 'dist/*'
            }),
            terser(),
            cleanup()
        ],
    }
];
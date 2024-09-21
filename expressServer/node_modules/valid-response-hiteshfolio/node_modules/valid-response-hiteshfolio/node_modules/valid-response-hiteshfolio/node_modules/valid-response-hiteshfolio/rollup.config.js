import { defineConfig } from "rollup";
import babel from "@rollup/plugin-babel";

export default defineConfig({
    input: "index.js",
    output: {
        name: "valid-response-hiteshfolio",
        dir: 'dist',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        babel({ babelHelpers: 'bundled' })
    ]
});

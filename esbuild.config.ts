import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/server.ts'],
    bundle: true,
    outfile: 'dist/server.mjs',
    format: 'esm',
    target: 'esnext',
    platform: 'node',
    alias: {
        '@src/*': 'src/*',
    },

    banner: {
        js: `
        const { require, __filename,__dirname } = await (async () => {
            const { createRequire } = await import('node:module');
            const { fileURLToPath } = await import('node:url');
            return {
                require: createRequire(import.meta.url),
                __filename: fileURLToPath(import.meta.url),
                __dirname: fileURLToPath(new URL('.', import.meta.url)),
            };
        })();
        `,
    },
})

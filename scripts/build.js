const { copyFile } = require('fs/promises');

const build = async () => {

    // Buildar para node
    // require('esbuild').buildSync({
    //     entryPoints: ['./src/index.ts'],
    //     bundle: true,
    //     minify: false,
    //     sourcemap: false,
    //     outdir: '/dist',
    //     platform: 'node',
    //     target: ['node10.4'],
    // });

    // // Buildar ECMAScript Module
    // require('esbuild').buildSync({
    //     entryPoints: ['./src/index.ts'],
    //     bundle: true,
    //     minify: false,
    //     sourcemap: false,
    //     outdir: '/dist/esm',
    //     format: 'esm',
    //     target: ['ES2018'],
    //     platform: 'browser',
    // });

    // // Buildar para browser
    // require('esbuild').buildSync({
    //     entryPoints: ['./src/index.ts'],
    //     bundle: true,
    //     minify: true,
    //     sourcemap: false,
    //     outfile: '/dist/unpkg/easyproctor.min.js',
    //     target: ['esnext']
    // });

    copyFile('package.json', './dist/package.json');
    copyFile('README.md', './dist/README.md');
};

build();
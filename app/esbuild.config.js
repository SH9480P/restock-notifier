const pkg = require('./package.json')
const { buildSync } = require('esbuild')

buildSync({
    entryPoints: ['src/**.ts'],
    outdir: 'dist',
    minify: false,
    bundle: true,
    platform: 'node',
    external: [...Object.keys(pkg.devDependencies), '@sparticuz/chromium'],
})

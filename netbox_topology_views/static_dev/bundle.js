const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

const options = {
    bundle: true,
    minify: true,
    sourcemap: 'external',
    sourcesContent: false,
    logLevel: 'error'
}

const ARGS = process.argv.slice(2)
const noCache = ARGS.includes('--no-cache')

async function bundleScripts() {
    const entryPoints = {
        app: 'js/home.js',
        images: 'js/images.js',
        toast: 'js/toast.js'
    }

    try {
        const result = await esbuild.build({
            ...options,
            outdir: '../static/netbox_topology_views/js/',
            entryPoints,
            target: 'es2016'
        })
        if (result.errors.length !== 0) return

        for (const [targetName, sourceName] of Object.entries(entryPoints)) {
            const source = sourceName.split('/').pop() // take last element
            console.log(
                `✅ Bundled source file '${source}' to '${targetName}.js'`
            )
        }
    } catch (err) {
        console.error(err)
    }
}

async function bundleStyles() {
    try {
        const entryPoints = {
            vendor: 'css/_external.scss',
            app: 'css/app.scss'
        }
        const pluginOptions = { outputStyle: 'compressed' }
        // Allow cache disabling.
        if (noCache) {
            pluginOptions.cache = false
        }

        const result = await esbuild.build({
            ...options,
            outdir: '../static/netbox_topology_views/css/',
            // Disable sourcemaps for CSS/SCSS files, see #7068
            sourcemap: false,
            entryPoints,
            plugins: [sassPlugin(pluginOptions)],
            loader: {
                '.eot': 'file',
                '.woff': 'file',
                '.woff2': 'file',
                '.svg': 'file',
                '.ttf': 'file'
            }
        })
        if (result.errors.length === 0) {
            for (const [targetName, sourceName] of Object.entries(
                entryPoints
            )) {
                const source = sourceName.split('/')[1]
                console.log(
                    `✅ Bundled source file '${source}' to '${targetName}.css'`
                )
            }
        }
    } catch (err) {
        console.error(err)
    }
}

async function bundleAll() {
    if (ARGS.includes('--styles')) {
        // Only run style jobs.
        return await bundleStyles()
    }
    if (ARGS.includes('--scripts')) {
        // Only run script jobs.
        return await bundleScripts()
    }
    await bundleStyles()
    await bundleScripts()
}

bundleAll()

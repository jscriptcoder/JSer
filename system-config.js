System.config({
    baseURL: './src',
    transpiler: 'typescript',
    map: {
        codemirrorlib: '../node_modules/codemirror/lib/codemirror.js',
        codemirrormodejs: '../node_modules/codemirror/mode/javascript/javascript.js'
    },
    packages: {
        codemirrorlib: {
            defaultExtension: false
        },
        '/': {
            defaultExtension: 'ts'
        }
    },
    meta: {
        codemirrorlib: {
            exports: 'CodeMirror',
            format: 'amd'
        }
    }
});
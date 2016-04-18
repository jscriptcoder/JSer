System.config({
    baseURL: './src',
    transpiler: 'typescript',
    map: {
        codemirror: '../node_modules/codemirror'
    },
    packages: {
        codemirror: {
            defaultExtension: 'js'
        },
        '/': {
            defaultExtension: 'ts'
        }
    },
    meta: {
        'codemirror/lib/codemirror.js': {
            exports: 'CodeMirror',
            format: 'amd'
        }
    }
});
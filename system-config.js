System.config({
    baseURL: 'src',
    transpiler: 'typescript',
    map: {
        'codemirror': '../node_modules/codemirror/lib/codemirror.js',
        'codemirror-lang-javascript': '../node_modules/codemirror/mode/javascript/javascript.js',
        'codemirror-editor-vim': '../node_modules/codemirror/keymap/vim.js'
    },
    packages: {
        '../node_modules': {
            defaultExtension: 'js'
        },
        '.': {
            defaultExtension: 'ts'
        }
    },
    meta: {
        'codemirror': {
            exports: 'CodeMirror',
            format: 'amd'
        }
    }
});
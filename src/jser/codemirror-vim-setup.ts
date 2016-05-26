import CodeMirror from 'codemirror';
import 'codemirror-lang-javascript';
import 'codemirror-editor-vim';

// configures write (:w),...
CodeMirror.Vim.defineEx('write', 'w', (cm: CodeMirror, info: any) => {
    cm.options.vim.onWrite(cm.getValue(), info.args && info.args[0]);
});

// quit (:q) and...
CodeMirror.Vim.defineEx('quit', 'q', (cm: CodeMirror, info: any) => {
    cm.options.vim.onQuit();
});

// write and quit (:wq) commands
CodeMirror.Vim.defineEx('wquit', 'wq', (cm: CodeMirror, info: any) => {
    cm.options.vim.onWrite(cm.getValue(), info.args && info.args[0]);
    cm.options.vim.onQuit();
});

export default CodeMirror;
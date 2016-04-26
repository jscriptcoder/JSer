import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';

import {createElement, compileTemplate, noop} from './utils';
import {EDITOR_TMPL} from './templates'
import ElementWrapper from './element-wrapper';

interface EditorConfig {
    lineNumbers: boolean;
    indentUnit: number;
    onSave: Function;
    onQuit: Function;
}

/**
 * Editor component, wrapping CodeMirror
 */
export default class Editor extends ElementWrapper {
    
    /**
     * Element container
     */
    private __container__: HTMLElement;

    /**
     * Instance of CodeMirror
     * @see https://codemirror.net
     */
    private __codemirror__: CodeMirror;
    
    constructor(container: HTMLElement, config: EditorConfig) {
        super(createElement());
        this.setup(container, config);
    }
    
    /**
     * Sets up the editor creating the element where CodeMirror 
     * will be appended to, styling it to take up the whole width 
     * and height and instantiating CodeMirror
     */
    private setup(container: HTMLElement, config: EditorConfig) {
        let style = window.getComputedStyle(container);
        if (style.position === 'static') {
            // we need to make this container relative
            // in order to be able to position the editor
            // absolutely, relative to the container
            container.style.position = 'relative';
        }
        
        this.style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });
        
        this.html = compileTemplate(EDITOR_TMPL, {
            date: new Date(),
            user: 'anonymous'
        });
        
        container.appendChild(this.__el__);
        
        // instantiates a Javascript VIM CodeMirror editor
        this.__codemirror__ = CodeMirror.fromTextArea(this.find('textarea'), {
            inputStyle: 'textarea',
            mode: 'javascript',
            keyMap: 'vim',
            lineNumbers: config.lineNumbers,
            indentUnit: config.identUnit
        });
        
        // configures the save (:w) and quit (:q) commands
        CodeMirror.commands.save = config.onSave;
        CodeMirror.commands.quit = config.onQuit;
        
        this.__container__ = container;
    }
    
    public destroy() {
        CodeMirror.commands.save = noop;
        CodeMirror.commands.quit = noop;
        
        this.empty();
        
        this.__container__.removeChild(this.__el__);
        this.__codemirror__ = null;
    }
    
}
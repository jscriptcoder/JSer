import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';

import {createElement} from './utils';
import ElementWrapper from './element-wrapper';

interface EditorConfig {
    
}

/**
 * Editor component, wrapping CodeMirror
 */
export default class Editor extends ElementWrapper {
    
    private __container__: HTMLElement;
    
    private __codemirror__: CodeMirror;
    
    constructor(container: HTMLElement, config: EditorConfig) {
        super(createElement());
        this.setup(container);
    }
    
    /**
     * Sets up the editor creating the element where
     * CodeMirror will be appended to, and styling it to
     * take up the whole width and height
     */
    private setup(container: HTMLElement) {
        let style = window.getComputedStyle(container);
        if (style.position === 'static') {
            // we need to make this container relative
            // in order to be able to position the editor
            // absolutely, relative to the container
            container.style.position = 'relative';
        }
        
        this.__container__ = container;
        
        this.style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });
        
        container.appendChild(this.__el__);
        
        this.__codemirror__ = new CodeMirror(this.__el__, {
            inputStyle: 'contenteditable',
            mode: 'javascript',
            keyMap: 'vim',
            lineNumbers: true,
            matchBrackets: true,
            showCursorWhenSelecting: true
        });
    }
    
    public destroy() {
        this.empty();
        this.__container__.removeChild(this.__el__);
        this.__codemirror__ = null;
    }
    
}
import {toChar} from './utils';

const SPECIAL_KEYS: {[idx: number]: string} = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    46: 'del'
};

export default class JserKeyboardEvent {
    
    private __target__: HTMLElement;
    private __onKeypressHandler__: Function;
    private __onKeypressListener__: EventListener;
    private __onKeydownListener__: EventListener;
    
    constructor(target: HTMLElement, onKeypressHandler: Function) {
        this.__target__ = target;
        this.__onKeypressHandler__ = onKeypressHandler;
        this.__onKeypressListener__ = this.__onKeypress__.bind(this);
        this.__onKeydownListener__ = this.__onKeydown__.bind(this);
        
        this.__setupEvents__();
    }
    
    private __setupEvents__() {
        this.__target__.addEventListener('keypress', this.__onKeypressListener__);
        this.__target__.addEventListener('keydown', this.__onKeydownListener__);
    }
    
    private __onKeypress__(event: KeyboardEvent) {
        event.preventDefault();
        
        if (!event.ctrlKey && !event.altKey) {
            this.__onKeypressHandler__('char', toChar(event.which));
        }
    }
    
    private __onKeydown__(event: KeyboardEvent) {
        switch(event.which) {
            case 8: // BACKSPACE
            case 46: // DEL
                event.preventDefault();
                this.__onKeypressHandler__('delete', SPECIAL_KEYS[event.which]);
                break;
            case 9: // TAB
                event.preventDefault();
                sys.interrupt('keypress', 'tab');
                break;
            case 13: // ENTER
                event.preventDefault();
                this.__onKeypressHandler__('enter', event.shiftKey);
                break;
            case 35: // END
            case 36: // HOME
                event.preventDefault();
                this.__onKeypressHandler__('jump', SPECIAL_KEYS[event.which], event.shiftKey);
                break;
            case 37: // LEFT
            case 38: // UP
            case 39: // RIGHT
            case 40: // DOWN
                event.preventDefault();
                this.__onKeypressHandler__('arrow', SPECIAL_KEYS[event.which], event.shiftKey);
                break;
            case 67: // C
                if (event.ctrlKey) {
                    event.preventDefault();
                    sys.interrupt('copy');
                }
                break;
        }
    }
    
    public destroy() {
        this.__target__.removeEventListener('keypress', this.__onKeypressListener__);
        this.__target__.removeEventListener('keydown', this.__onKeydownListener__);
    }
    
}
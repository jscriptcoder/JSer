import * as utils from './utils';
import ElementWrapper from './element-wrapper';
import CommandHistory from './command-history';
import ProgramBlock from './program-block';
import KeyboardHook from './keyboard-hook';

interface PromptConfig {
    historyLimit: number;
    tabLength: number;
    onCommand: Function;
    keyboardTarget: HTMLElement;
}

/**
 * Takes care of the whole shell prompt logic
 */
export default class Prompt extends ElementWrapper {
    
    /**
     * Indicates whether or not we're in selection mode
     */
    private __isSelection__: boolean;
    
    /**
     * Command line introduced
     */
    private __command__: string;
    
    /**
     * Keeps track of the cursor position
     */
    private __cursorPos__: number;
    
    /**
     * Element symbol
     */
    private __symbol__: HTMLElement;
    
    /**
     * Element input
     */
    private __input__: HTMLElement;
    
    /**
     * Element cursor
     */
    private __cursor__: HTMLElement;
    
    /**
     * Callback function called when a command is entered
     */
    private __onCommand__: Function;
    
    /**
     * @see Selection {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection}
     */
    private __selection__: Selection;
    
    /**
     * @see Range {@link https://developer.mozilla.org/en-US/docs/Web/API/Range}
     */
    private __range__: Range;
    
    /**
     * @see CommandHistory
     */
    private __history__: CommandHistory;
    
    /**
     * @see ProgramBlock
     */
    private __program__: ProgramBlock;
    
    /**
     * @see KeyboardHook
     */
    private __keyboard__: KeyboardHook;
            
    constructor(el: HTMLElement, config: PromptConfig) {
        super(el);
        
        this.__isSelection__ = false;
        this.__command__ = '';
        this.__cursorPos__ = 0; //zero-base
        
        this.__symbol__ = this.find('.jser-prompt-symbol');
        this.__input__ = this.find('.jser-prompt-input');
        this.__cursor__ = this.find('.jser-prompt-cursor');
        
        this.__onCommand__ = config.onCommand;

        this.__selection__ = document.getSelection();
        this.__range__ = document.createRange();
        
        this.__history__ = new CommandHistory(config.historyLimit);
        this.__program__ = new ProgramBlock(config.tabLength);
        
        this.__keyboard__ = new KeyboardHook(
                                config.keyboardTarget, 
                                this.__onKeypressHandler__.bind(this));

    }
    
    /**
     * Gets called when the user interacts with the keyboard
     */
    private __onKeypressHandler__(type: string, key: string, extraKeyPressed?: boolean) {
        if (typeof this[type] === 'function') {
            this[type](key, extraKeyPressed);
        }
    }
    
    /**
     * Gets back the left and right (to the cursor) parts of the command
     */
    private __getCommandParts__(): string[] {
        return [
            this.__command__.substring(0, this.__cursorPos__),
            this.__command__.substr(this.__cursorPos__)
        ];
    }
    
    /**
     * Joins the left and right parts to form the new command, 
     * adding the cursor in between
     */
    private __joinCommandAndInsert__([left, right]: string[]) {
        this.__command__ = left + right;
        
        this.__input__.innerHTML = utils.htmlEncode(left);
        this.__input__.appendChild(this.__cursor__);
        this.__input__.innerHTML += utils.htmlEncode(right.substr(1));
    }
    
    /**
     * Removes the cursor from the input
     */
    private __removeCursor__() {
        this.__input__.innerHTML = utils.htmlEncode(this.__command__);
    }
    
    /**
     * Prepares for selection of a single character
     */
    private __charSelection__() {
        if (!this.__isSelection__) {
            this.__isSelection__ = true;
            
            this.__removeCursor__();
            this.__selection__.removeAllRanges();
            
            const commandNode = this.__input__.firstChild;
            
            this.__range__.setStart(commandNode, this.__cursorPos__);
            this.__range__.setEnd(commandNode, this.__cursorPos__);
            
            this.__selection__.addRange(this.__range__);
        }
    }

    private __deleteSelection__() {
        const range = this.__selection__.getRangeAt(0);
        const selected = this.__command__.slice(range.startOffset, range.endOffset);
        
        // deletes the selected text from the command
        this.__command__ = this.__command__.replace(selected, '');
        
        // by setting the cursor position to the beginning of the selection
        // we put everything back together including cursor in the right position
        this.moveCursorTo(range.startOffset);
    }
    
    private __deleteChar__(action: string) {
        let [left, right] = this.__getCommandParts__();
        const part = action === 'backspace' ? left : right;
        
        if (part !== '') { // do nothing if there is nothing to delete
            
            switch(action) {
                case 'backspace':
                    // deletes last char from the left part
                    left = part.slice(0, -1);
                    this.__cursorPos__--;
                    break;
                    
                case 'backspace':
                    // deletes first char from the right part
                    if (part.length > 1) {
                        right = left + part.substr(2);
                    } else {
                        right = '';
                        this.__cursor__.innerHTML = utils.nbsp();
                    }
                    break;
            }
            
            this.__joinCommandAndInsert__([left, right]);
            
        }
        
    }
    
    /**
     * Moves the cursor to a different position
     */
    public moveCursorTo(position: number) {
        if (position < 0) {
            this.__cursorPos__ = 0;
        } else if (position > this.__command__.length) {
            this.__cursorPos__ = this.__command__.length;
        } else {
            this.__cursorPos__ = position
        }
        
        const [left, right] = this.__getCommandParts__();
        const curChar = right.charAt(0);
        
        this.__cursor__.innerHTML = curChar ? utils.htmlEncode(curChar) : utils.nbsp();
        
        this.__joinCommandAndInsert__([left, right]);
        
        // let's always end selection time here
        this.__isSelection__ = false;
    }
    
    /**
     * Moves the cursor forward
     */
    public moveCursorForward() {
        this.moveCursorTo(this.__cursorPos__ + 1);
    }
    
    /**
     * Moves the cursor backward
     */
    public moveCursorBackward() {
        this.moveCursorTo(this.__cursorPos__ - 1);
    }
    
    /**
     * Moves the cursor to the beginning
     */
    public moveCursorHome() {
        this.moveCursorTo(0);
    }
    
    /**
     * Moves the cursor to the end
     */
    public moveCursorEnd() {
        this.moveCursorTo(this.__command__.length);
    }
    
    /**
     * Shows the previous command in the input
     */
    public showPreviousCommand() {
        this.__command__ = this.__program__.strTab + this.__history__.previous;
    }
    
    /**
     * Shows the next command in the input
     */
    public showNextCommand() {
        this.__command__ = this.__program__.strTab + this.__history__.next;
    }
    
    /**
     * Overrides toString method, returning the text content
     */
    public toString(): string {
        return this.text;
    }
    
    /**
     * Destroys the instance
     */
    public destroy() {
        this.__history__.destroy();
        this.__program__.destroy();
        this.__keyboard__.destroy();
    }
}
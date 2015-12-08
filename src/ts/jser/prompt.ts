import * as utils from './utils';
import ElementWrapper from './element-wrapper';
import CommandHistory from './command-history';
import ProgramBlock from './program-block';
import KeyboardHook from './keyboard-hook';

interface PromptConfig {
    historyLimit: number;
    tabLength: number;
    onEnter: Function;
    onTab: Function;
    keyboardTarget: HTMLElement;
}

/**
 * Matches matching members to be listed
 */
const MATCHING_MEMBERS_RE = new RegExp('^[a-z0-9_\$]+$', 'i');

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
    private __cursorPosition__: number;
    
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
    private __onEnter__: Function;
    
    /**
     * Callback function called when a tab matching members is entered
     */
    private __onTab__: Function;
    
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
        this.__cursorPosition__ = 0; //zero-base
        
        this.__symbol__ = this.find('.jser-prompt-symbol');
        this.__input__ = this.find('.jser-prompt-input');
        this.__cursor__ = this.find('.jser-prompt-cursor');
        
        this.__onEnter__ = config.onEnter;
        this.__onTab__ = config.onTab;

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
    private __onKeypressHandler__(action: string, key: string, shift?: boolean): void {
        const method = `__${action}__`
        if (typeof this[method] === 'function') {
            this[method](key, shift);
        }
    }
    
    /**
     * Gets back the left and right (to the cursor) parts of the command
     */
    private __getCommandParts__(): string[] {
        return [
            this.__command__.substring(0, this.__cursorPosition__),
            this.__command__.substr(this.__cursorPosition__)
        ];
    }
    
    /**
     * Joins the left and right parts to form the new command, 
     * adding the cursor in between
     */
    private __joinCommandAndInsert__([left, right]: string[]): void {
        const cursorInnerHTML = this.__cursor__.innerHTML;
        
        this.__command__ = left + right;
        
        // Stupid IE empties this cursor element when 
        // we set the input to an empty string
        this.__input__.innerHTML = '';
        this.__cursor__.innerHTML = cursorInnerHTML;
        
        this.__input__.appendChild(utils.createFragment(...[
            utils.createText(left),
            this.__cursor__,
            utils.createText(right.substr(1))
        ]));
    }
    
    /**
     * Removes the cursor from the input
     */
    private __removeCursor__(): void {
        this.__input__.innerHTML = utils.htmlEncode(this.__command__);
    }
    
    /**
     * Prepares a selection range
     */
    private __prepareSelectionRange__(): void {
        if (!this.__isSelection__) {
            this.__isSelection__ = true;
            
            this.__removeCursor__();
            this.__selection__.removeAllRanges();
            
            const commandNode = this.__input__.firstChild;
            
            this.__range__.setStart(commandNode, this.__cursorPosition__);
            this.__range__.setEnd(commandNode, this.__cursorPosition__);
        }
    }

    /**
     * Deletes selected text
     */
    private __deleteSelection__(): void {
        const range = this.__selection__.getRangeAt(0);
        const selected = this.__command__.slice(range.startOffset, range.endOffset);
        
        // deletes the selected text from the command
        this.__command__ = this.__command__.replace(selected, '');
        
        // by setting the cursor position to the beginning of the selection
        // we put everything back together including cursor in the right position
        this.moveCursorTo(range.startOffset);
    }
    
    /**
     * Deletes selected character
     */
    private __deleteCharacter__(action: string): void {
        let [left, right] = this.__getCommandParts__();
        const part = action === 'backspace' ? left : right;
        
        if (part !== '') { // do nothing if there is nothing to delete
            
            switch(action) {
                case 'backspace':
                    // deletes last char from the left part
                    left = part.slice(0, -1);
                    this.__cursorPosition__--;
                    break;
                    
                case 'del':
                    // deletes first char from the right part
                    if (part.length > 1) {
                        right = left + part.substr(2);
                    } else {
                        right = '';
                        this.__cursor__.innerHTML = utils.space();
                    }
                    break;
            }
            
            this.__joinCommandAndInsert__([left, right]);
            
        }
        
    }
    
    /**
     * Inserts a new character in the input
     */
    private __insertCharacter__(char: string): void {
        
        // if there is selection, delete first
        if (this.__isSelection__) {
            this.__deleteSelection__();
        }
        
        let [left, right] = this.__getCommandParts__();
        
        // adds a char to the left part
        left += char;
        this.__cursorPosition__ += char.length;
        
        this.__joinCommandAndInsert__([left, right]);
    }
    
    /**
     * Creates a new range selection for the element
     */
    private __newRange__(node: Node, startOffset, endOffset) {
            this.__selection__.removeAllRanges();
            this.__range__.setStart(node, startOffset);
            this.__range__.setEnd(node, endOffset);
            this.__selection__.addRange(this.__range__);
    }
    
    /**
     * Selects characters from the left on
     */
    public selectLeftCharacter(): void {
        if (this.__cursorPosition__ > 0) {
            
            this.__prepareSelectionRange__();
            
            let startOffset = this.__range__.startOffset;
            let endOffset = this.__range__.endOffset;
            
            if (this.__range__.startOffset < this.__cursorPosition__) {
                endOffset--; // move the end to the left
            } else if (this.__range__.startOffset == this.__cursorPosition__) {
                startOffset--; // move the beginning to the left
            }
            
            this.__newRange__(this.__input__.firstChild, startOffset, endOffset);
            
            this.__cursorPosition__--;
        }
    }
    
    /**
     * Selects characters from the left on
     */
    public selectRightCharacter(): void {
        if (this.__cursorPosition__ < this.__command__.length) {
            
            this.__prepareSelectionRange__();

            let startOffset = this.__range__.startOffset;
            let endOffset = this.__range__.endOffset;
            
            if (this.__range__.endOffset > this.__cursorPosition__) {
                startOffset++; // move the beginning to the right
            } else if (this.__range__.endOffset == this.__cursorPosition__) {
                endOffset++; // move the end to the right
            }
            
            this.__newRange__(this.__input__.firstChild, startOffset, endOffset);
            
            this.__cursorPosition__++;
        }
    }
    
    /**
     * Selects a range of characters to the left
     */
    public selectLeftRange(): void {
        if (this.__cursorPosition__ > 0) {
            
            this.__prepareSelectionRange__();
            
            let startOffset = this.__range__.startOffset;
            let endOffset = this.__range__.endOffset;
            
            if (this.__range__.startOffset < this.__cursorPosition__) {
                endOffset = startOffset;
            }
            
            this.__newRange__(
                this.__input__.firstChild, 
                this.__cursorPosition__ = 0, 
                endOffset
            );
        }
    }
    
    /**
     * Selects a range of characters to the right
     */
    public selectRightRange(): void {
        if (this.__cursorPosition__ < this.__command__.length) {
            
            this.__prepareSelectionRange__();

            let startOffset = this.__range__.startOffset;
            let endOffset = this.__range__.endOffset;
            
            if (this.__range__.endOffset > this.__cursorPosition__) {
                startOffset = endOffset;
            }
            
            this.__newRange__(
                this.__input__.firstChild, 
                startOffset, 
                this.__cursorPosition__ = this.__command__.length
            );
        }
    }
    
    /**
     * Moves the cursor to a different position
     */
    public moveCursorTo(position: number): void {
        if (position < 0) {
            this.__cursorPosition__ = 0;
        } else if (position > this.__command__.length) {
            this.__cursorPosition__ = this.__command__.length;
        } else {
            this.__cursorPosition__ = position
        }
        
        const [left, right] = this.__getCommandParts__();
        const curChar = right.charAt(0);
        
        this.__cursor__.innerHTML = curChar ? utils.htmlEncode(curChar) : utils.space();
        
        this.__joinCommandAndInsert__([left, right]);
        
        // let's always end selection time here
        this.__isSelection__ = false;
    }
    
    /**
     * Moves the cursor forward
     */
    public moveCursorForward(): void {
        this.moveCursorTo(this.__cursorPosition__ + 1);
    }
    
    /**
     * Moves the cursor backward
     */
    public moveCursorBackward(): void {
        this.moveCursorTo(this.__cursorPosition__ - 1);
    }
    
    /**
     * Moves the cursor to the beginning
     */
    public moveCursorHome(): void {
        this.moveCursorTo(0);
    }
    
    /**
     * Moves the cursor to the end
     */
    public moveCursorEnd(): void {
        this.moveCursorTo(this.__command__.length);
    }
    
    /**
     * Shows the previous command in the input
     */
    public showPreviousCommand(): void {
        this.enterCommand(this.__program__.strTabs + this.__history__.previous);
    }
    
    /**
     * Shows the next command in the input
     */
    public showNextCommand(): void {
        this.enterCommand(this.__program__.strTabs + this.__history__.next)
    }
    
    /**
     * Enters a command in the input
     */
    public enterCommand(command: string): void {
        this.__command__ = command;
        this.moveCursorEnd();
    }
    
    /**
     * Indicates whether or not the command is valid (more than just spaces)
     */
    public get isCommand(): boolean {
        return !this.__command__.match(/^\s*$/);
    }
    
    /**
     * Clears the prompt from any command
     */
    public clear(): void {
        this.__command__ = '';
        this.moveCursorTo(0);
    }
    
    /**
     * Overrides toString method, returning the text content
     */
    public toString(): string {
        return this.text;
    }
    
    /**
     * Activates or not the prompt
     */
    public set active(is: boolean) {
        if (is) {
            // activates the prompt
            this.__cursor__.classList.add('blink'); // cursor blinking
            this.__keyboard__.capture = true; // start capturing keys
        } else {
            // deactivates the prompt
            this.__cursor__.classList.remove('blink'); // stop blinking
            this.__keyboard__.capture = false; // stop capturing keys
        }
        
    }
    
    public blink(): void {
        this.__cursor__.classList.remove('spin');
        this.__cursor__.classList.add('blink');
    }
    
    public spin(): void {
        this.__cursor__.classList.remove('blink');
        this.__cursor__.classList.add('spin');
    }
    
    /**
     * Destroys the instance
     */
    public destroy(): void {
        this.__history__.destroy();
        this.__program__.destroy();
        this.__keyboard__.destroy();
    }
    
    /********************/
    /* KEYBOARD ACTIONS */
    /********************/
    
    /**
     * Sends BACKSPACE/DEL to the input
     */
    private __delete__(action: string): void {
        if (this.__command__ !== '') {
            if (this.__isSelection__) {
                this.__deleteSelection__();
            } else {
                this.__deleteCharacter__(action);
            }
        }
    }
    
    /**
     * Sends a TAB to the input
     */
    private __tab__(num: number = 1): void {
        if (this.__command__.match(MATCHING_MEMBERS_RE) && !this.__program__.is) {
            this.__onTab__(this.__command__);
        } else {
            this.__insertCharacter__(utils.repeatString(num, this.__program__.strTab));   
        }
    }
    
    /**
     * Sends ENTER to the input
     */
    private __enter__(shift: boolean): void {
        let command = this.__command__.trim();
        let inProgram = false;
        let endProgram = false;
        const program = this.__program__;
        const openingBlock = !!command.match(program.BEGIN_BLOCK_RE);
        const closingBlock = !!command.match(program.END_BLOCK_RE);
        
        // Warning: tricky logic coming up
        
        // if
        //   1. we've pressed shift or
        //   2 .we're opening a block or
        //   3. we're already in a block, then:
        //     it's program
        // 
        inProgram = shift || openingBlock || program.isBlock;
        
        // now, if
        //   1. we're in a program and 
        //   2. we're not closing a block while being in the last one, then:
        //     it's still a program
        inProgram = inProgram && !(program.isLastBlock && closingBlock);
        
        // we're in a program and getting out
        if (program.is && !inProgram) {
            program.addLine(command);
            command = program.get();
            program.clear(); // program.is => false
            endProgram = true;
        }
        
        this.__onEnter__(command, !inProgram);
        this.__history__.add(command);
        this.clear();
        
        if (inProgram) {
            program.addLine(command); // program.is => true
            
            // hides the symbol at the beginning of a program
            if (program.numLines === 1) {
                const symbolLength = this.__symbol__.textContent.trim().length;
                this.__symbol__.innerHTML = utils.space(symbolLength);
            }
            
            // sends as many tabs as there are in the previous line
            if (program.tabs) this.__tab__(program.tabs);
            
        } else if (endProgram) {
            // returns the symbol if a program finished
            this.__symbol__.innerHTML = this.__symbol__.dataset['symbol'];            
        }
    }
    
    /**
     * Sends HOME/END to the input
     */
    private __jump__(action: string, shift: boolean): void {
        switch(action) {
            case 'home':
                if (shift) {
                    this.selectLeftRange();
                } else {
                    this.moveCursorHome();
                }
                break;
            case 'end':
                if (shift) {
                    this.selectRightRange();
                } else {
                    this.moveCursorEnd();
                }
                break;
        }
    }
    
    /**
     * Sends arrows to the input
     */
    private __arrow__(action: string, shift: boolean): void {
        switch(action) {
                
            case 'up': this.showPreviousCommand(); break;
            case 'down': this.showNextCommand(); break;
                
            case 'left':
                if (shift) {
                    this.selectLeftCharacter();
                } else {
                    this.moveCursorBackward();
                }
                break;
            
            case 'right':
                if (shift) {
                    this.selectRightCharacter();
                } else {
                    this.moveCursorForward();
                }
        }
    }
    
    /**
     * Sends a character to the input
     */
    private __char__(char: string): void {
        if (this.__program__.isBlock && !this.isCommand && char === '}') {
            
            // we're in a block and closing with a single bracket
            // Let's move the cursor one tab back
            this.clear();
            this.__tab__(this.__program__.tabs - 1);
        }
        
        this.__insertCharacter__(char);
    }
    
}
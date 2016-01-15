import {repeatString} from './utils';

/**
 * Matches open bracket
 */
const BEGIN_BLOCK_RE = /{$/;

/**
 * Matches closing bracket
 */
const END_BLOCK_RE = /}$/;

/**
 * Keeps track of lines of program. Used when writing blocks {}
 * or using shift + enter
 */
export default class ProgramBlock {

    /**
     * List of program lines
     */
    private __lines__: string[];
    
    /**
     * Keeps track of the current block
     */
    private __brackets__: boolean[];
    
    /**
     * Keeps track of the current tab
     */
    private __tabs__: number;
    
    /**
     * Tabs as a string of spaces
     */
    private __strTab__: string;
    
    constructor(tabLength: number = 4) {
        this.__lines__ = [];
        this.__brackets__ = [];
        this.__tabs__ = 0;
        
        // creates a tab with as many spaces as tabLength
        this.__strTab__ = repeatString(tabLength, ' ');
    }
    
    /**
     * Initialises a block
     */
    private __beginBlock__() {
        this.__brackets__.push(true);
        this.__tabs__++;
    }
    
    /**
     * Ends a block
     */
    private __endBlock__() {
        this.__brackets__.pop();
        this.__tabs__--;
    }
    
    /**
     * Whether or not we have a program
     */
    public get is(): boolean {
        return this.__lines__.length > 0;
    }
    
    /**
     * Whether or not we are in a block
     */
    public get isBlock(): boolean {
        return this.__brackets__.length > 0;
    }
    
    /**
     * tabs getter 
     */
    public get tabs(): number {
        return this.__tabs__;    
    }
    
    /**
     *  strTab getter
     */
    public get strTab(): string {
        return this.__strTab__;
    }
    
    /**
     *  returns all the tabs so far
     */
    public get strTabs(): string {
        return repeatString(this.__tabs__, this.__strTab__);
    }
    
    /**
     * Returns the number of lines
     */
    public get numLines(): number {
        return this.__lines__.length;
    }
    
    /**
     * Whether or not we are in the last block
     */
    public get isLastBlock(): boolean {
        return this.__brackets__.length === 1; 
    }
    
    /**
     * Returns the program in one line
     */
    public get(): string {
        return this.__lines__.join('');
    }
    
    /**
     * Adds a line to the program
     */
    public addLine(line: string) {
        
        // beginning of a block
        if (line.match(BEGIN_BLOCK_RE)) {
            this.__beginBlock__();
        }
        
        this.__lines__.push(line);
        
        // end of a block
        if (line.match(END_BLOCK_RE)) {
            this.__endBlock__();
        }
    }
        
    /**
     * Returns the last line of the program
     */
    public get lastLine(): string {
        return this.__lines__[this.__lines__.length - 1];
    }
    
    /**
     * Clears the program
     */
    public clear() {
        this.__lines__.length = 0;
        this.__brackets__.length = 0;
        this.__tabs__ = 0;
    }
    
    /**
     * Exposes BEGIN_BLOCK_RE regular expression
     */
    public get BEGIN_BLOCK_RE(): RegExp {
        return BEGIN_BLOCK_RE;
    }
    
    /**
     * Exposes END_BLOCK_RE regular expression
     */
    public get END_BLOCK_RE(): RegExp {
        return END_BLOCK_RE;
    }
    
    /**
     * Destroys the instance
     */
    public destroy() {
        this.clear();
    }
    
}
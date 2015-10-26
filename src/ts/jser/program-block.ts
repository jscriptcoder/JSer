import {repeatStr, regExp} from './utils';

const BEGIN_BLOCK_RE = new RegExp('\\{$');
const END_BLOCK_RE = new RegExp('\\}$');

export default class JserProgramBlock {

    private __lines__: string[];
    private __brackets__: boolean[];
    private __tabs__: number;
    private __strTab__: string;
    
    constructor(tabLength: number = 4) {
        this.__lines__ = [];
        this.__brackets__ = [];
        this.__tabs__ = 0;
        
        this.__strTab__ = repeatStr(tabLength, ' ');
    }
    
    public get is(): boolean {
        return this.__lines__.length > 0;
    }
    
    public get isBlock(): boolean {
        return this.__brackets__.length > 0;
    }
    
    public get numTabs(): number {
        return this.__tabs__;    
    }
    
    public get strTabs(): string {
        return repeatStr(this.__tabs__, this.__strTab__);
    }
    
    public get numLines(): number {
        return this.__lines__.length;
    }
    
    public get(): string {
        return this.__lines__.join('');
    }
    
    public addLine(line: string): void {
        
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
    
    private __beginBlock__(): void {
        this.__brackets__.push(true);
        this.__tabs__++;
    }
    
    private __endBlock__(): void {
        this.__brackets__.pop();
        this.__tabs__--;
    }
    
    public get lastLine(): string {
        return this.__lines__[this.__lines__.length - 1];
    }
    
    public clear(): void {
        this.__lines__.length = 0;
        this.__brackets__.length = 0;
        this.__tabs__ = 0;
    }
    
    public destroy() {
        this.clear();
    }
    
}
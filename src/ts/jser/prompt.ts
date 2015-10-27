import * as utils from './utils';
import Element from './element';
import CommandHistory from './command-history';
import ProgramBlock from './program-block';

export default class Prompt extends Element {
    
    private __symbol__: HTMLElement;
    private __input__: HTMLElement;
    private __cursor__: HTMLElement;
    
    private __history__: CommandHistory;
    private __program__: ProgramBlock;
    
    private __selection: Selection;
    private __range__: Range;
    
    private __isSelection__: boolean;
    private __command__: string;
    private __cursorPos__: number;
    
    constructor(el: HTMLElement, symbol: string) {
        super(el);
        
    }
    
    public destroy() {}
}
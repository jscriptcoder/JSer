import * as utils from './utils';
import Element from './element';
import CommandHistory from './command-history';
import ProgramBlock from './program-block';
import KeyboardHook from './keyboard-hook';

interface PromptConfig {
    historyLimit: number;
    tabLength: number;
    onCommand: Function;
    keyboardTarget: HTMLElement;
}

export default class Prompt extends Element {
    
    private __isSelection__: boolean;
    private __command__: string;
    private __cursorPos__: number;
    
    private __symbol__: HTMLElement;
    private __input__: HTMLElement;
    private __cursor__: HTMLElement;
    
    private __onCommand__: Function;
    private __history__: CommandHistory;
    private __program__: ProgramBlock;
    private __keyboard__: KeyboardHook;
    
    private __selection: Selection;
    private __range__: Range;
        
    constructor(el: HTMLElement, config: PromptConfig) {
        super(el);
        
        this.__isSelection__ = false;
        this.__command__ = '';
        this.__cursorPos__ = 0; //zero-base
        
        this.__symbol__ = this.find('.jser-prompt-symbol');
        this.__input__ = this.find('.jser-prompt-input');
        this.__cursor__ = this.find('.jser-prompt-cursor');
        
        this.__init__(config);
    }
    
    private __init__(config: PromptConfig) {
        
        this.__onCommand__ = config.onCommand;
        
        this.__history__ = new CommandHistory(config.historyLimit);
        this.__program__ = new ProgramBlock(config.tabLength);
        
        this.__keyboard__ = new KeyboardHook(
                                config.keyboardTarget, 
                                this.__onKeypressHandler__.bind(this));
    
        this.__selection = document.getSelection();
        this.__range__ = document.createRange();
        
    }
    
    private __onKeypressHandler__(type: string, key: string, extra: any) {
        
    }
    
    public toString(): string {
        return this.text;
    }
    
    public destroy() {}
}
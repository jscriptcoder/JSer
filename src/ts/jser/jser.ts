/// <reference path="jser.d.ts" />

import * as utils from './utils';
import * as tmpl from './templates';

import Element from './element';
import Output from './output';
import Prompt from './prompt';

const DEFAULT_CONFIG: JSerConfig = {
    backgroundColor: 'black',
    fontColor: '#44D544',
    fontSize: '12px',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    promptSymbol: 'jser>',
    historyLimit: 50,
    tabLength: 4
};
    
export default class JSer extends Element {
        
    private __uid__: number;
    
    private __api__: JSerAPI;
    private __config__: JSerConfig;
    
    private __output__: Output;
    private __prompt__: Prompt;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        super(el);
        
        this.__uid__ = utils.uid();
        this.__api__ = api;
        this.__config__ = utils.extend({}, DEFAULT_CONFIG, config);
        
        this.__generateStyles__();
        this.__init__();
    }
    
    private __generateStyles__() {
        
        let stylesTmpl = utils.compileTmpl(tmpl.JSER_STYLES_TMPL, {
            'uid': this.__uid__.toString(),
            'font-family': this.__config__.fontFamily,
            'font-color': this.__config__.fontColor,
            'font-size': this.__config__.fontSize,
            'background-color': this.__config__.backgroundColor
        });

        utils.injectStyles(stylesTmpl);
    }
    
    private __init__() {
        this.addClass(`jser_${this.__uid__}`);
        
        this.html = utils.compileTmpl(tmpl.JSER_TMPL, {
            'prompt-symbol': this.__config__.promptSymbol
        });
        
        let output = this.find('.jser-output');
        let prompt = this.find('.jser-prompt-input');
        
        this.__output__ = new Output(output);
        this.__prompt__ = new Prompt(prompt, {
            historyLimit: this.__config__.historyLimit,
            tabLength: this.__config__.tabLength,
            onCommand: this.__onCommand__.bind(this),
            keyboardTarget: this.__el__
        });
    }
    
    private __onCommand__(command: string) {
        this.__output__.print(this.__prompt__.toString());
        //execute command here
    }
    
    public destroy() {
        this.__output__.destroy();
        this.__prompt__.destroy();
    }
    
}
/// <reference path="jser.d.ts" />

import Element from './element';
import * as utils from './utils';
import * as tmpl from './templates';

import JserOutput from './output';
import JserPrompt from './prompt';

const DEFAULT_CONFIG: JSerConfig = {
    backgroundColor: 'white',
    fontColor: '#44D544',
    fontSize: '12px',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    promptSymbol: 'jser>',
    tabLength: 4
};
    
export default class JSer extends Element {
        
    private __uid__: number;
    
    private __api__: JSerAPI;
    private __config__: JSerConfig;
    
    private __output__: JserOutput;
    private __prompt__: JserPrompt;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        
        super(el);
        
        this.__uid__ = utils.uid();
        
        this.__api__ = api;
        this.__config__ = utils.extend({}, DEFAULT_CONFIG, config);
        
        this.__generateStyles__();
        this.__init__();
    }
    
    private __generateStyles__() {
        
        let stylesTmpl = utils.compileTmpl(tmpl.JSER_STYLES, {
            'uid': this.__uid__.toString(),
            'font-family': this.__config__.fontFamily,
            'font-color': this.__config__.fontColor,
            'font-size': this.__config__.fontSize,
            'background-color': this.__config__.backgroundColor
        });

        utils.injectStyles(stylesTmpl);
    }
    
    private __init__() {
        this.__el__.classList.add(`jser_${this.__uid__}`);
        this.__el__.innerHTML = tmpl.JSER_TMPL;
        
        let output = <HTMLElement>this.__el__.querySelector('.jser-output');
        let prompt = <HTMLElement>this.__el__.querySelector('.jser-prompt-input');
        
        this.__output__ = new JserOutput(output);
        this.__prompt__ = new JserPrompt(prompt, this.__config__.promptSymbol);
    }
    
    public destroy() {
        this.__output__.destroy();
        this.__prompt__.destroy();
    }
    
}
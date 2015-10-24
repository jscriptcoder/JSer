/// <reference path="jser.d.ts" />

import * as utils from './utils';
import * as tmpl from './templates';

import JserOutput from './output'
import JserPrompt from './prompt'

export default class JSer {
    
    static DEFAULT_CONFIG: JSerConfig = {
        backgroundColor: 'white',
        fontColor: '#44D544',
        fontSize: '12px',
        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
        promptSymbol: 'jser>',
    };
    
    private __uid__: number;
    
    private __el__: HTMLElement;
    
    private __api__: JSerAPI;
    private __config__: JSerConfig;
    
    private __output__: JserOutput;
    private __prompt__: JserPrompt;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        
        this.__uid = utils.uid();
        
        this.__el__ = el;
        this.__api__ = api;
        this.__config__ = utils.extend({}, JSer.DEFAULT_CONFIG, config);
        
        this.__generateStyles__();
        this.__setupDOM__();
    }
    
    private __generateStyles__() {
        let style = document.createElement('style');
        let stylesTmpl = tmpl.JSER_STYLES
                            .replace(/\$uid/g, this.__uid__.toString())
                            .replace(/\$font-family/g, this.__config__.fontFamily)
                            .replace(/\$font-color/g, this.__config__.fontColor)
                            .replace(/\$font-size/g, this.__config__.fontSize)
                            .replace(/\$background-color/g, this.__config__.backgroundColor);

        style.innerHTML = stylesTmpl;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    private __setupDOM__() {
        this.__el__.classList.add(`jser_${this.__uid__}`);
        this.__el__.innerHTML = tmpl.JSER_TMPL
                                    .replace(/\$prompt-symbol/, this.__config__.promptSymbol);
        
        this.__output__ = new JserOutput(<HTMLElement>this.__el__.querySelector('.jser-output'));
        this.__prompt__ = new JserPrompt(<HTMLElement>this.__el__.querySelector('.jser-prompt-input'));
    }
    
}
/// <reference path="jser.d.ts" />

import * as utils from './utils';
import * as tmpl from './tmpl';

export default class JSer {
    
    static DEFAULT_CONFIG: JSerConfig = {
        backgroundColor: 'black',
        fontColor: '#44D544',
        fontSize: '12px',
        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
        promptSymbol: 'jser>',
    };
    
    private __uid__: number;
    
    private __el__: HTMLElement;
    private __output__: HTMLElement;
    private __input__: HTMLElement;
    private __cursor__: HTMLElement;
    
    private __api__: JSerAPI;
    private __config__: JSerConfig;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        
        this.__uid__ = utils.uid();
        
        this.__el__ = el;
        this.__api__ = api;
        this.__config__ = utils.extend({}, JSer.DEFAULT_CONFIG, config);
        
        this.__createUI__();
    }
    
    private __createUI__() {
        
        // Generates the custom styles
        let style = document.createElement('style');
        let stylesTmpl = tmpl.JSER_STYLES
                            .replace(/\$uid/g, this.__uid__.toString())
                            .replace(/\$font-family/g, this.__config__.fontFamily)
                            .replace(/\$font-color/g, this.__config__.fontColor)
                            .replace(/\$font-size/g, this.__config__.fontSize)
                            .replace(/\$background-color/g, this.__config__.backgroundColor);

        style.innerHTML = stylesTmpl;
        document.getElementsByTagName('head')[0].appendChild(style);
        
        // Crestes JSer DOM
        this.__el__.classList.add(`jser_${this.__uid__}`);
        this.__el__.innerHTML = tmpl.JSER_TMPL
                                    .replace(/\$prompt-symbol/, this.__config__.promptSymbol);
        
        this.__output__ = <HTMLElement>this.__el__.querySelector('.jser-output');
        this.__input__ = <HTMLElement>this.__el__.querySelector('.jser-prompt-input');
        this.__cursor__ = <HTMLElement>this.__el__.querySelector('.jser-prompt-cursor');
    }
    
}
/// <reference path="jser.d.ts" />

import * as utils from './utils';
import * as tmpl from './templates';

import ElementWrapper from './element-wrapper';
import Output from './output';
import Prompt from './prompt';

/**
 * Configuration by default
 */
const DEFAULT_CONFIG: JSerConfig = {
    backgroundColor: 'black',
    fontColor: '#44D544',
    fontSize: '12px',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    promptSymbol: 'jser>',
    historyLimit: 50,
    tabLength: 4
};

/**
 * Shell application for user interaction with custom APIs
 */
export default class JSer extends ElementWrapper {
    
    /**
     * Unique ID for the instance
     */
    private __uid__: number;
    
    /**
     * API for this instance
     */
    private __api__: JSerAPI;
    
    /**
     * List of configuration items
     */
    private __config__: JSerConfig;
    
    /**
     * onClick listener
     */
    private __onClickListener__: EventListener;
    
    /**
     * onFocus listener
     */
    private __onFocusListener__: EventListener;
    
    /**
     * onBlur listener
     */
    private __onBlurListener__: EventListener;
    
    /**
     * @see Output
     */
    private __output__: Output;
    
    /**
     * @see Prompt
     */
    private __prompt__: Prompt;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        super(el);
        
        this.__uid__ = utils.uid();
        this.__api__ = api;
        this.__config__ = utils.extend({}, DEFAULT_CONFIG, config);
        
        this.__addEventListeners__();
        this.__generateStyles__();
        this.__init__();
    }
    
    /**
     * Attaches some event handlers (click, focus and blur)
     */
    private __addEventListeners__(): void {
        this.__onClickListener__ = this.__onClick__.bind(this);
        this.__onFocusListener__ = this.__onFocus__.bind(this);
        this.__onBlurListener__ = this.__onBlur__.bind(this);
        
        this.addListener('click', this.__onClickListener__);
        this.addListener('focus', this.__onFocusListener__);
        this.addListener('blur', this.__onBlurListener__);
    }
    
    /**
     * Event handler for click
     */
    private __onClick__(event: MouseEvent: void {
        
    }
    
    /**
     * Event handler for focus
     */
    private __onFocus__(event: Event): void {
        
    }
    
    /**
     * Event handler for blur
     */
    private __onBlur__(event: Event): void {
        
    }
    
    /**
     * Generates and injects styles for the instance
     */
    private __generateStyles__(): void {
        
        const stylesTmpl = utils.compileTmpl(tmpl.JSER_STYLES_TMPL, {
            'uid': this.__uid__.toString(),
            'font-family': this.__config__.fontFamily,
            'font-color': this.__config__.fontColor,
            'font-size': this.__config__.fontSize,
            'background-color': this.__config__.backgroundColor
        });

        utils.injectStyles(stylesTmpl);
    }
    
    /**
     * Initializes JSer, attaching template to the DOM
     * and running Output and Prompt logic
     */
    private __init__(): void {
        this.addClass(`jser_${this.__uid__}`);
        
        this.html = utils.compileTmpl(tmpl.JSER_TMPL, {
            'prompt-symbol': this.__config__.promptSymbol
        });

        this.__output__ = new Output(this.find('.jser-output'));
        
        this.__prompt__ = new Prompt(this.find('.jser-prompt-input'), {
            historyLimit: this.__config__.historyLimit,
            tabLength: this.__config__.tabLength,
            onCommand: this.__onCommand__.bind(this),
            keyboardTarget: this.__el__
        });
    }
    
    /**
     * Gets trigger when a command has heen entered
     */
    private __onCommand__(command: string): void {
        this.__output__.print(this.__prompt__.toString());
        // todo: execute command here
    }
    
    /**
     * Destroys the instance
     */
    public destroy(): void {
        this.removeListener('click', this.__onClickListener__);
        this.removeListener('focus', this.__onFocusListener__);
        this.removeListener('blur', this.__onBlurListener__);
        
        this.__output__.destroy();
        this.__prompt__.destroy();
    }
    
}
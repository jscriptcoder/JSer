/// <reference path="jser.d.ts" />

import * as utils from './utils';
import * as tmpl from './templates';

import ElementWrapper from './element-wrapper';
import ClickHook from './click-hook';
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
    tabLength: 4,
    active: true
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
     * Indicates whether or not jser has the focus
     */
    private __active__: boolean;
    
    /**
     * @see Output
     */
    private __output__: Output;
    
    /**
     * @see Prompt
     */
    private __prompt__: Prompt;
    
    /**
     * @see FocusHook
     */
    private __click__: ClickHook;
    
    constructor(el: HTMLElement, api: JSerAPI, config?: JSerConfig) {
        super(el);
        
        this.__uid__ = utils.uid();
        this.__api__ = api;
        this.__config__ = utils.extend({}, DEFAULT_CONFIG, config);
        
        this.__generateStyles__();
        this.__initialize__();
    }
    
    /**
     * Generates and injects styles for the instance
     */
    private __generateStyles__(): void {
        
        const stylesTmpl = utils.compileTemplate(tmpl.JSER_STYLES_TMPL, {
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
    private __initialize__(): void {
        this.addClass(`jser_${this.__uid__}`);
        
        this.html = utils.compileTemplate(tmpl.JSER_TMPL, {
            'prompt-symbol': this.__config__.promptSymbol
        });

        this.__click__ = new ClickHook(this.__el__, this.__clickHandler__.bind(this));
        
        this.__output__ = new Output(this.find('.jser-output'));
        
        this.__prompt__ = new Prompt(this.find('.jser-prompt'), {
            historyLimit: this.__config__.historyLimit,
            tabLength: this.__config__.tabLength,
            onCommand: this.__onCommand__.bind(this),
            keyboardTarget: this.__el__
        });
        
        this.__prompt__.active = this.__config__.active;
    }
    
    /**
     * Gets called when the user clicks on the page
     */
    private __clickHandler__(action: string) {
        switch(action) {
            case 'focus': 
                this.__prompt__.active = true;
                break;
            case 'blur':
                this.__prompt__.active = false;
                break;
        }
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
        this.__click__.destroy();
        this.__output__.destroy();
        this.__prompt__.destroy();
    }
    
}
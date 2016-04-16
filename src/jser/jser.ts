/// <reference path="../../typings/es6-shim/es6-shim.d.ts" />

import * as utils from './utils';
import * as tmpl from './templates';

import ElementWrapper from './element-wrapper';
import ClickHook from './click-hook';
import Output from './output';
import Prompt from './prompt';
import ApiWrapper from './api-wrapper';
import BaseAPI from './base-api';

interface JSerConfig {
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontFamily?: string;
    infoColor?: string,
    warnColor?: string,
    errorColor?: string,
    promptSymbol?: string;
    promptPassword?: string,
    historyLimit?: number
    tabLength?: number;
    active?: boolean;
}

/**
 * Configuration by default
 */
const DEFAULT_CONFIG: JSerConfig = {
    backgroundColor: 'black',
    fontColor: '#44d544',
    fontSize: '12px',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    infoColor: '#31708f',
    warnColor: '#f0ad4e',
    errorColor: '#a94442',
    promptSymbol: 'jser>',
    promptPassword: 'Password:',
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
     * Unique name for this widget;
     */
    private __name__: string;
    
    /**
     * List of configuration items
     */
    private __config__: JSerConfig;
    
    /**
     * Indicates whether or not jser has the focus
     */
    private __active__: boolean;
    
    /**
     * Will contain the callback for entered password
     */
    private __onPassword__: (password: string) => void;
    
    /**
     * @see FocusHook
     */
    private __click__: ClickHook;
    
    /**
     * @see ApiWrapper
     */
    private __api__: ApiWrapper;
    
    /**
     * @see Output
     */
    private __output__: Output;
    
    /**
     * @see Prompt
     */
    private __prompt__: Prompt;
    
    constructor(el: HTMLElement, api: Object, config?: JSerConfig) {
        super(el);
        
        this.__uid__ = utils.uid();
        this.__name__ = `jser_${this.__uid__}`;
        this.__config__ = Object.assign({}, DEFAULT_CONFIG, config);
        
        this.__click__ = new ClickHook(this.__el__, this.__clickHandler__.bind(this));
        this.__api__ = new ApiWrapper(this.__name__, utils.extend(new BaseAPI(this), api));
        
        this.__generateStyles__();
        this.__render__();
        
        this.__api__.init();
    }
    
    /**
     * Generates and injects styles for the instance
     */
    private __generateStyles__() {
        
        const stylesTmpl = utils.compileTemplate(tmpl.JSER_STYLES_TMPL, {
            'uid': this.__uid__.toString(),
            'font-family': this.__config__.fontFamily,
            'font-color': this.__config__.fontColor,
            'font-size': this.__config__.fontSize,
            'info-color': this.__config__.infoColor,
            'warn-color': this.__config__.warnColor,
            'error-color': this.__config__.errorColor,
            'background-color': this.__config__.backgroundColor
        });

        utils.injectStyles(stylesTmpl, this.__name__);
    }
    
    /**
     * Renders JSer, attaching template to the DOM
     * and running Output and Prompt logic
     */
    private __render__() {
        this.addClass(this.__name__);
        
        this.html = utils.compileTemplate(tmpl.JSER_TMPL, {
            'prompt-symbol': this.__config__.promptSymbol
        });
        
        this.__output__ = new Output(this.find('.jser-output'));
        
        this.__prompt__ = new Prompt(this.find('.jser-prompt'), {
            historyLimit: this.__config__.historyLimit,
            tabLength: this.__config__.tabLength,
            onEnter: this.__onEnter__.bind(this),
            onTab: this.__onTab__.bind(this),
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
     * Indicates whether or not we're on password mode
     */
    private get isPasswordMode(): boolean {
        return typeof this.__onPassword__ === 'function';
    }
    
    /**
     * On password mode, when the user enters the password, this method 
     * gets triggered, possibly returning a promise. But it's not all said
     */
    private onPassword(command: string): any {
        let onPassResult = this.__onPassword__(command);
        this.__onPassword__ = void 0;
        this.__prompt__.resetSymbol();
        this.__prompt__.hideTyping = false;
        return onPassResult;
    }
    
    /**
     * Gets triggered when a command (or block) has heen entered
     */
    private __onEnter__(command: string, run: boolean) {
        
        if (this.isPasswordMode) {
            // password mode
            let onPassResult = this.onPassword(command);
            this.__processCommandResult__(onPassResult);
            
        } else {
            
            this.print(this.__prompt__.toString());

            if (command && run) {
                // let's process the command
                let [evalResult, type] = this.__api__.exec(command);
                this.__processCommandResult__(evalResult, type);
            }
            
        }
        
    }
    
    /**
     * Process the result of a command, printing a "type" message
     */
    private __processCommandResult__(result: any, type?: string) {
        if (result instanceof Promise) {

            this.promptWaiting();

            result
                .then(this.__promiseThen__.bind(this))
                .catch(this.__promiseCatch__.bind(this))
            ;

        } else if (result) {
            this.print(result, type);
        }
    }
    
    /**
     * Gets triggered when tab has been entered to list matching members
     */
    private __onTab__(command: string) {
        const command_re = new RegExp(`^${command}`, 'i');
        const matches = this.__api__.members.filter((member: string) => {
            return !!member.match(command_re);
        });
        
        if (matches.length > 1) {
            // shows the possible options
            this.infoMessage(`<pre>/**\n * ${matches.join('\n * ')}\n */</pre>`);
            
            // autocompletes with the common matching word
            this.__prompt__.enterCommand(matches.reduce((prev: string, current: string) => {
                let i;
                for(i = 0; i < prev.length && prev[i] === current[i]; i++);
                return prev.substr(0, i);
            }));
            
        } else if (matches.length === 1) {
            // autocomplete
            this.__prompt__.enterCommand(matches[0]);
        }
    }
    
    /**
     * Callback for "then" promise method
     */
    private __promiseThen__(result: any) {
        this.__afterPromise__(result, 'info');
    }

    /**
     * Callback for "catch" promise method
     */
    private __promiseCatch__(message: string) {
        this.__afterPromise__(message, 'error');
    }
    
    /**
     * Callback after the promise resolves or rejects
     */
    private __afterPromise__(toPrint: string, type: string) {
        this.print(toPrint, type);
        this.promptWaiting(false);
    }
    
    /**
     * Empties the ourput
     */
    public emptyScreen() {
        this.__output__.empty();
    }
    
    /**
     * Clears the prompt
     */
    public clearPrompt() {
        this.__prompt__.clear();
    }
    
    /**
     * Sends a message to the output
     */
    public print(message: string | string[], type?: string) {
        this.__output__.print(message, type);
        this.__prompt__.scrollIntoView();
    }
    
    /**
     * Logs a message
     */
    public logMessage(message: string) {
        this.print(message);
    }
    
    /**
     * Logs a message, info level
     */
    public infoMessage(message: string) {
        this.print(message, 'info');
    }
    
    /**
     * Logs a message, warn level
     */
    public warnMessage(message: string) {
        this.print(message, 'warn');
    }
    
    /**
     * Logs a message, error level
     */
    public errorMessage(message: string) {
        this.print(message, 'error');
    }
    
    /**
     * Shows spinning or blinking cursor
     */
    public promptWaiting(spin: boolean = true) {
        if (spin) {
            this.__prompt__.spin();
        } else {
            this.__prompt__.blink();
        }
    }
    
    /**
     * Scrolls the prompt into view
     */
    public scrollIntoView() {
        this.__prompt__.scrollIntoView();
    }
    
    /**
     * Extends the current API
     */
    public extendApi(...apis: Object[]) {
        this.__api__.extend(...apis);
    }
    
    /**
     * Returns a list of available commands
     */
    public get commands(): string[] {
        return this.__api__.commands;
    }
    
    /**
     * Executes a command
     */
    public exec(command) {
        this.__api__.exec(command);
    }
    
    /**
     * Goes into password mode (changes symbol and hides typing)
     * todo: maybe some more generic mode?
     */
    public passwordMode(onPassword: (password: string) => void) {
        this.clearPrompt();
        this.__prompt__.symbol = this.__config__.promptPassword;
        this.__prompt__.hideTyping = true;
        this.__onPassword__ = onPassword;
    }
    
    /**
     * Destroys the instance
     */
    public destroy() {
        this.__click__.destroy();
        this.__output__.destroy();
        this.__prompt__.destroy();
    }
}
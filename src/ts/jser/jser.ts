import * as utils from './utils';
import * as tmpl from './templates';

import ElementWrapper from './element-wrapper';
import ClickHook from './click-hook';
import Output from './output';
import Prompt from './prompt';
import ApiEval from './api-eval';

interface JSerConfig {
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontFamily?: string;
    resultColor?: string,
    errorColor?: string,
    promptSymbol?: string;
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
    resultColor: '#31708f',
    errorColor: '#a94442',
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
     * @see FocusHook
     */
    private __click__: ClickHook;
    
    /**
     * @see ApiEval
     */
    private __eval__: ApiEval;
    
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
        this.__config__ = utils.extend({}, DEFAULT_CONFIG, config);
        
        this.__eval__ = new ApiEval(this.__name__, api);
        this.__click__ = new ClickHook(this.__el__, this.__clickHandler__.bind(this));
        
        this.__generateStyles__();
        this.__render__();
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
            'result-color': this.__config__.resultColor,
            'error-color': this.__config__.errorColor,
            'background-color': this.__config__.backgroundColor
        });

        utils.injectStyles(stylesTmpl, this.__name__);
    }
    
    /**
     * Renders JSer, attaching template to the DOM
     * and running Output and Prompt logic
     */
    private __render__(): void {
        this.addClass(this.__name__);
        
        this.html = utils.compileTemplate(tmpl.JSER_TMPL, {
            'prompt-symbol': this.__config__.promptSymbol
        });
        
        this.__output__ = new Output(this.find('.jser-output'));
        
        this.__prompt__ = new Prompt(this.find('.jser-prompt'), {
            historyLimit: this.__config__.historyLimit,
            tabLength: this.__config__.tabLength,
            onEnter: this.__onEnter__.bind(this),
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
    private __onEnter__(command: string, run: boolean): void {
        this.__output__.print(this.__prompt__.toString());
        
        if (command && run) {
            let [result, type] = this.__eval__.run(command);
            result && this.__output__.print(result, type);
        }
        
        this.__prompt__.scrollIntoView();
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
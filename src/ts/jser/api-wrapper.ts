import {extend} from './utils';

/**
 * Matches function params list
 */
const FUNC_PARAMS_RE = /[a-z0-9_\$]+/gi;

/**
 * Matches function signature
 */
const FUNC_SIGNATURE_RE = /^function\s*[^\(]*\(\s*[^\)]*\)/;

/**
 * Matches just function and name
 */
const FUNC_AND_NAME_RE = /function\s*[^\(]*/;

export default class ApiWrapper {
    
    /**
     * Name used for the global object
     */
    private __apiName__: string
    
    /**
     * Instance of an API
     */
    private __api__: Object;
    
    /**
     * List of commands (members' signature) provided by the public API
     */
    private __commands__: string[];
    
    /**
     * List of members of the API
     */
    private __members__: string[];

    constructor(name: string, api: Object) {
        this.__apiName__ = `__${name}__api__`;
        this.__api__ = api;
        this.__cacheCommands__();
    }
    
    /**
     * Caches the list of commands
     */
    private __cacheCommands__(): void {
        this.__commands__ = [];
        this.__members__ = [];
        
        for(let memberName in this.__api__) {
            if (memberName.indexOf('_') === 0) continue; // skips privates
            
            this.__members__.push(memberName);
            
            let memberValue = this.__api__[memberName];
            let memberValueString = `${memberValue}`.trim();
            
            if (typeof memberValue === 'function') {
                // methodName([...args])
                this.__commands__.push(memberValueString.match(FUNC_SIGNATURE_RE)[0].replace(FUNC_AND_NAME_RE, memberName));
            } else {
                // property = value
                this.__commands__.push(`${memberName} = ${memberValue}`);
            }
        }
    }
    
    /**
     * Runs a command evaluating on the global scope against the API
     */
    public run(command: string): any[] {
        
        let evalResult: string;
        const globalEval = window['eval']; // indirect eval call, eval'ing in global scope
        
        // tests whether or not it's a function params command
        const funcParams: string[] = command.match(FUNC_PARAMS_RE);

        if (funcParams && typeof this.__api__[funcParams[0]] === 'function') {
            
            const funcName = funcParams.shift(); // function name
            const params = funcParams.map((param) => { // list of parameters
                try {
                    globalEval(param); // number, boolean, Object, otherwise exception (meant to be a string)
                    return param;
                } catch (e) {
                    return `'${param}'`; // string (wrapped in quotations)
                }
            });
            
            // builds funcName(param1, param2, ...);
            command = `${funcName}(${params.join(', ')})`;
        }

        window[this.__apiName__] = this.__api__;
        
        try {
            // the magic happens here:
            evalResult = globalEval(`with(${this.__apiName__}){${command}}`);
            if (typeof evalResult !== 'undefined') {
                return [evalResult, 'info'];
            } else {
                return [];
            }
            
        } catch(err) {
            return [err.toString(), 'error']
        }

        delete window[this.__apiName__];
        
    }
    
    /**
     * API getter
     */
    public get api(): Object {
        return this.__api__;
    }
    
    /**
     * Extends the current API
     */
    public extend(...mixins: Object[]) {
        extend(this.__api__, mixins);
    }
    
    /**
     * commands getter
     */
    public get commands(): string[] {
        return this.__commands__;
    }
    
    /**
     * members getter
     */
    public get members(): string[] {
        return this.__members__;
    }
    
}
import {extend, getMemberFrom} from './utils';

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

/**
 * Wrapper for the api. It'll run javascript against it and extend it
 */
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
     * Executes a command evaluating on the global scope against the API
     */
    public exec(command: string): any[] {
        
        const globalEval = window['eval']; // indirect eval call, eval'ing in global scope
        
        // this function will do the magic trick ;-)
        const doEval = (cmd: string): any[] => {
        
            let evalResult: string;
            let returnEval: any[];
            
            window[this.__apiName__] = this.__api__;
            
            // the magic happens here:
            evalResult = globalEval(`with(${this.__apiName__}){${cmd}}`);
            if (typeof evalResult !== 'undefined') {
                returnEval = [evalResult, 'info'];
            } else {
                returnEval = [];
            }
            
            delete window[this.__apiName__];
            
            return returnEval;
            
        }
        
        // for commands such as "path.to.member.of.api" that turns out to be
        // methods then API.path.to.member.of.api()
        if (typeof getMemberFrom(this.__api__, command) === 'function') command = `${command}()`;
        
        try {
            
            return doEval(command);
            
        } catch(err1) {
            
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

                try { // let's try again with the new command

                    return doEval(command);
                    
                } catch(err2) {
                    
                    return [err2.toString(), 'error'];
                    
                }
                
            } else {
                
                return [err1.toString(), 'error'];
                
            }
            
        }

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
    public extend(...apis: Object[]) {
        extend(this.__api__, ...apis);
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
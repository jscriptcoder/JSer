/**
 * Matches function params list
 */
const FUNC_PARAMS_RE = new RegExp('[a-z0-9_\$]+', 'gi');

export default class ApiWrapper {
    
    /**
     * Name used for the global object
     */
    private __apiName__: string
    
    /**
     * Instance of an API
     */
    private __api__: Object;
    
    // TODO: cache methods
    
    constructor(name: string, api: Object) {
        this.__apiName__ = `__${name}__api__`;
        this.__api__ = api;
    }
    
    /**
     * Runs a command evaluating on the global scope against the API
     */
    public run(command: string): any[] {
        
        let evalResult: string;
        let globalEval = window['eval']; // indirect eval call, eval'ing in global scope
        
        // tests whether or not it's a function params command
        let funcParams: string[] = command.match(FUNC_PARAMS_RE);

        if (funcParams && typeof this.__api__[funcParams[0]] === 'function') {
            
            let funcName = funcParams.shift(); // function name
            let params = funcParams.map((param) => { // list of parameters
                try {
                    return globalEval(param); // number, boolean
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
                return [evalResult, 'result'];
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
    
}
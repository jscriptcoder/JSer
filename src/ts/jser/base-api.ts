import JSer from '../jser/jser';

const HEADER_MESSAGE: string = `
<pre>
/**
 * The adventure begins here. Type <i>lsc</i> to see the available commands...
 * Remember, this is all about coding in JavaScript, and you'll discover an amazing world ;-)
 *
 * <strong>@author</strong> <i>Francisco Ramos <<a href="mailto:fran@jscriptcoder.com">fran@jscriptcoder.com</a>></i>
 * <strong>@version</strong> <i>who.cares.0</i>
 * <strong>@see</strong> <i><a href="https://github.com/jscriptcoder/jser" target="_blank">GitHub</a></i>
 * <strong>@see</strong> <i><a href="https://codio.com/jscriptcoder/jser/" target="_blank">Codio.com</a></i>
 */
</pre>`;

/**
 * Basic list of commands
 */
export default class BaseAPI {
    
    /**
     * Instance of JSer
     */
    private __jser__: JSer;
    
    constructor(jser: JSer) {
        this.__jser__ = jser;
    }
    
    /**
     * Some initialization
     * Should be overriden
     */
    public init() {
        this.jser.infoMessage(HEADER_MESSAGE);
    }
    
    /**
     * Getter of JSer private instance
     */
    public get jser() {
        return this.__jser__;
    }
    
    /**
     * Clears the screen
     */
    public clear() {
        this.jser.emptyScreen();
        this.jser.clearPrompt();
    }
    
    /**
     * Lists commands
     */
    public lsc(commands: string[] = this.jser.commands) {
        this.jser.infoMessage(`<pre>/**\n * ${commands.join('\n * ')}\n */</pre>`);
    }

    /**
     * Inspects objects, exposing their API
     */
    public inspect(obj: Object) {
        let commands: string[] = [];
        const FUNC_SIGNATURE_RE = /^function\s*[^\(]*\(\s*[^\)]*\)/;
        const FUNC_AND_NAME_RE = /function\s*[^\(]*/;
        const members = Object.keys(obj)
                            .concat(Object.getOwnPropertyNames(obj))
                            .concat(Object.getOwnPropertyNames((obj).constructor.prototype))
                            .filter((value, pos, arr) => arr.indexOf(value) === pos);

        for(let memberName of members) {
            
            if (memberName.indexOf('_') === 0) continue; // skips privates
            
            let memberValue = obj[memberName];
            let memberValueString = `${memberValue}`.trim();

            if (typeof memberValue === 'function') {
                // methodName([...args])
                commands.push(memberValueString.match(FUNC_SIGNATURE_RE)[0].replace(FUNC_AND_NAME_RE, memberName));
                
            /*} else if (typeof memberValue === 'string'){
                // string => "string"
                commands.push(`${memberName} = "${memberValue}"`);*/
                
            } else if (Array.isArray(memberValue)) {
                // array => [...]
                commands.push(`${memberName} = [\n      ${memberValue.join(',\n      ')}\n   ]`);
            } else {
                // property = value
                commands.push(`${memberName} = ${memberValue}`);
            }
        }
        
        if (commands.length) {
            this.lsc(commands);
        } else {
            this.jser.warnMessage('No public API was found');
        }
    }

    /**
     * Login command
     */
    public login(username: string = '', password: string = '') {
        
        if (username === '') {
            throw new Error('No username has been entered');
        } else if(password === '') {
            
            // no password has been entered,
            // let's prompt the user for password
            // we enter on password mode
            
            this.jser.passwordMode((password: string) => this.login(username, password));
            
        } else {
            this.onLogin(username, password);
        }
        
    }
    
    /**
     * Gets trigger when the user has entered credentials (username and password)
     * Must be overriden
     */
    public onLogin(username: string, password: string) {
        if (!username) throw new Error('No username has been entered');
        if (!password) throw new Error('No password has been entered');
        
        this.jser.warnMessage('Please, override <i>onLogin</i> method');
    }
    
    public editor(filename: string) {
        this.jser.warnMessage('TO-DO');
    }
    
    public run(filename: string) {
        this.jser.warnMessage('TO-DO');
    }
    
}
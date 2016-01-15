import JSer from '../jser/jser';

export default class BaseAPI {
    
    /**
     * Instance of JSer
     */
    private __jser__: JSer;
    
    constructor(jser: JSer) {
        this.__jser__ = jser;
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
            let memberValue = obj[memberName];
            let memberValueString = `${memberValue}`.trim();

            if (typeof memberValue === 'function') {
                // methodName([...args])
                commands.push(memberValueString.match(FUNC_SIGNATURE_RE)[0].replace(FUNC_AND_NAME_RE, memberName));
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
        
        console.log(`Credentials: ${username}@${password}`);
    }
    
}
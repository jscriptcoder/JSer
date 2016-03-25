import JSer from '../jser/jser';

const HEADER_MESSAGE: string = `
<pre>
/**
 * The adventure begins here. Type <i>lsc</i> to list the available commands...
 * Remember, this is all about coding in JavaScript, and you'll discover an amazing world ;-)
 *
 * <strong>@author</strong> <i>Francisco Ramos <<a href="mailto:fran@jscriptcoder.com">fran@jscriptcoder.com</a>></i>
 * <strong>@version</strong> <i>who.cares.0</i>
 * <strong>@see</strong> <i><a href="https://github.com/jscriptcoder/jser" target="_blank">GitHub</a></i>
 * <strong>@see</strong> <i><a href="https://codio.com/jscriptcoder/jser/" target="_blank">Codio.com</a></i>
 */
</pre>`;

export default class JScriptCoderAPI {
    
    /**
     * Instance of JSer (read only)
     */
    public jser: JSer;
    
    public init() {
        this.jser.infoMessage(HEADER_MESSAGE);
    }
    
    /**
     * API name
     */
    public apiName: string = 'JScriptCoderAPI';
    
    /**
     * Alias for lsc command
     */
    public help() {
        this.jser.exec('lsc');
    }
    
    /**
     * Alias for login command
     */
    public sudo(user: string) {
        this.jser.exec(`login ${user}`);
    }
    
    /**
     * Alias for write command
     */
    public edit(filename: string) {
        this.jser.exec(`write ${filename}`);
    }
    
    /**
     * Alias for read command
     */
    public view(filename: string) {
        this.jser.exec(`read ${filename}`);
    }
    
    /**
     * Alias for exec command
     */
    public run(filename: string) {
        this.jser.exec(`exec ${filename}`);
    }
    
    /**
     * Will send the credentials to the backend (username and password)
     */
    protected backendLogin(username: string, password: string) {
        if (!username) throw new Error('No username has been entered');
        if (!password) throw new Error('No password has been entered');
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("I'm all logged in");
            }, 3000);
        });
    }
    
}
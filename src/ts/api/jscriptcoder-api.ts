import JSer from '../jser/jser';

export default class JScriptCoderAPI {
    
    /**
     * Instance of JSer (read only)
     */
    public jser: JSer;
    
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
    
}
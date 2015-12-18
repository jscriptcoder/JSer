import JSer from '../jser/jser';

export default class BaseAPI {
    
    private __jser__: JSer;
    
    public clear() {
        this.__jser__.emptyScreen();
        this.__jser__.clearPrompt();
    }
    
    public lsc(commands: string[] = this.__jser__.commands) {
        this.__jser__.infoMessage(`<pre>/**\n * ${commands.join('\n * ')}\n */</pre>`);
    }
    
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
            this.__jser__.warnMessage('No public API was found');
        }
    }
    
}
import {createElement} from './utils';
import ElementWrapper from './element-wrapper';

export default class Output extends ElementWrapper {
    
    constructor(el: HTMLElement) {
        super(el);
    }
    
    /**
     * Shows messages in the screen
     */
    public print(message: string | string[], type: string = 'default'): void {
        if (Array.isArray(message)) { // there are more than one line
            for(let msg of message) {
                this.print(msg, type);
            }
        } else {
            let div: HTMLElement = createElement();
            div.className = type;
            div.innerHTML = message;
            this.__el__.appendChild(div);
        }
    }
    
    /**
     * Destroys the instance
     */
    public destroy() {
        this.empty();
    }
}
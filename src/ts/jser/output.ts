import Element from './element';
import {createElement} from './utils';

export default class JserOutput extends Element {
    
    constructor(el: HTMLElement) {
        super(el);
    }
    
    public print(message: string, type?: string): void {
        if (Array.isArray(message)) { // there are more than one line
            for(let msg of message) {
                this.print(msg, type);
            }
        } else {
            let div: HTMLElement = createElement();
            div.innerHTML = message;

            if (typeof type === 'string') div.className = type;

            this.__el__.appendChild(div);
        }
    }
    
    public destroy() {}
}
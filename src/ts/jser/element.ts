export default class Element {
    
    protected __el__: HTMLElement;
    
    constructor(el: HTMLElement) {
        this.__el__ = el;
    }
}
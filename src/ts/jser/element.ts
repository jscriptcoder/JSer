export default class Element {
    
    protected __el__: HTMLElement;
    
    constructor(el: HTMLElement) {
        this.__el__ = el;
    }
    
    public find(selector: string): HTMLElement {
        return this.__el__.querySelector(selector);
    }
    
    public addClass(className: string) {
        this.__el__.classList.add(className);
    }
    
    public removeClass(className: string) {
        this.__el__.classList.remove(className);
    }
    
    public set html(innerHTML: string) {
        this.__el__.innerHTML = innerHTML;
    }
    
    public get html(): string {
        return this.__el__.innerHTML;
    }
}
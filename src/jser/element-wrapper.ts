/**
 * HTMLElement wrapper to manipulate DOM elements more easily (jQuery-like)
 */
export default class ElementWrapper {
    
    /**
     * Element being wrapped
     */
    protected __el__: HTMLElement;
    
    constructor(el: HTMLElement) {
        this.__el__ = el;
    }
    
    /**
     * Finds an element by the given selector
     */
    public find(selector: string): HTMLElement {
        return <HTMLElement>this.__el__.querySelector(selector);
    }
    
    /**
     * Adds a class to the element
     */
    public addClass(className: string) {
        this.__el__.classList.add(className);
    }
    
    /**
     * Removes a class from the element
     */
    public removeClass(className: string) {
        this.__el__.classList.remove(className);
    }
    
    /**
     * Adds an event listener
     */
    public addListener(type: string, listener: EventListener) {
        this.__el__.addEventListener(type, listener);
    }
    
    /**
     * Removes the even listener
     */
    public removeListener(type: string, listener: EventListener) {
        this.__el__.removeEventListener(type, listener);
    }
    
    /**
     * Shows the element
     */
    public show() {
        this.__el__.style.display = 'block';
    }
    
    /**
     * Hides the element
     */
    public hide() {
        this.__el__.style.display = 'none';
    }
    
    /**
     * Sets the innerHTML
     */
    public set html(innerHTML: string) {
        this.__el__.innerHTML = innerHTML;
    }
    
    /**
     * Returns the html content from the element
     */
    public get html(): string {
        return this.__el__.innerHTML;
    }
    
    /**
     * Sets the text content
     */
    public set text(textContent: string) {
        this.__el__.textContent = textContent;
    }
    
    /**
     * Gets the text content from the element
     */
    public get text(): string {
        return this.__el__.textContent;
    }
    
    /**
     * Empties the element
     */
    public empty() {
        this.html = '';
    }
    
    /**
     * Scrolls the element into the visible area of the browser
     */
    public scrollIntoView() {
        this.__el__.scrollIntoView(true);
    }
    
    /**
     * Returns the DOM element
     */
    public get element(): HTMLElement {
        return this.__el__;
    }
    
    /**
     * Inline-styles the element from a hashmap {key: value}
     * Note: key styles are lowerCamelCase
     */
    public style(styles: {[key: string]: any}) {
        
        if (styles && typeof styles === 'object') {
            for(let key of Object.keys(styles)) {
                this.__el__.style[key] = styles[key];
            }
        }
        
    }
    
}
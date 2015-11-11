/**
 * HTMLElement wrapper
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
    public addClass(className: string): void {
        this.__el__.classList.add(className);
    }
    
    /**
     * Removes a class from the element
     */
    public removeClass(className: string): void {
        this.__el__.classList.remove(className);
    }
    
    /**
     * Adds an event listener
     */
    public addListener(type: string, listener: EventListener): void {
        this.__el__.addEventListener(type, listener);
    }
    
    /**
     * Removes the even listener
     */
    public removeListener(type: string, listener: EventListener): void {
        this.__el__.removeEventListener(type, listener);
    }
    
    /**
     * Shows the element
     */
    public show(): void {
        this.__el__.style.display = 'block';
    }
    
    /**
     * Hides the element
     */
    public hide(): void {
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
    public empty(): void {
        this.html = '';
    }
    
    /**
     * Scrolls the element into the visible area of the browser
     */
    public scrollIntoView(): void {
        this.__el__.scrollIntoView();
    }
    
}
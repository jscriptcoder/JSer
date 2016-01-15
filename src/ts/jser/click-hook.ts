import {defer} from './utils';

export default class ClickHook {
    
    /**
     * Element target of focus event
     */
    private __target__: HTMLElement;
    
    /**
     * Event handler for focus
     */
    private __onClickHandler__: Function;
    
    /**
     * onClick listener
     */
    private __onClickListener__: EventListener;
    
    /**
     * onDocumentClick listener
     */
    private __onDocumentClickListener__: EventListener;
    
    /**
     * onWindowBlur listener
     */
    private __onWindowBlurListener__: EventListener;
    
    constructor(target: HTMLElement, onClickHandler: Function) {
        this.__target__ = target;
        this.__onClickHandler__ = onClickHandler;
        this.__addEventListeners__();
    }
    
    /**
     * Attaches some event handlers (keypress and keydown)
     */
    private __addEventListeners__() {
        this.__onClickListener__ = this.__onClick__.bind(this);
        this.__onDocumentClickListener__ = this.__onDocumentClick__.bind(this);
        this.__onWindowBlurListener__ = this.__onWindowBlur__.bind(this);
        
        this.__target__.addEventListener('click', this.__onClickListener__);
        document.addEventListener('click', this.__onDocumentClickListener__);
        window.addEventListener("blur", this.__onWindowBlurListener__);
    }
    
    /**
     * Event handler for click
     */
    private __onClick__(e: MouseEvent) {
        
        // if this is triggered we're getting back the focus but 
        // we need to defer to wait for the event bubbling to finish
        defer(() => this.__onClickHandler__('focus'));
    }
    
    /**
     * Event handler for documentClick
     */
    private __onDocumentClick__(e: MouseEvent) {
        // if this is triggered it means we're losing the focus
        this.__onClickHandler__('blur');
    }
    
    /**
     * Event handler for windowBlur
     */
    private __onWindowBlur__(e: MouseEvent) {
        this.__onClickHandler__('blur');
    }
    
    /**
     * Destroys the instance removing event listeners
     */
    public destroy() {
        this.__target__.removeEventListener('click', this.__onClickListener__);
        document.removeEventListener('click', this.__onDocumentClickListener__);
        window.removeEventListener("blur", this.__onWindowBlurListener__);
    }
    
}
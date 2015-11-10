/**
 * Shortcut for document
 */
const doc: Document = document;

/**
 * Shortcut for head
 */
const head: HTMLElement = doc.getElementsByTagName('head')[0];

/**
 * Matches spaces
 */
const SPACE_RE: RegExp = new RegExp('\\s', 'g');

/**
 * Unicode space
 */
const USPACE: string = '\u00A0';

/**
 * Returns a unique ID
 */
export const uid: {(): number} = (() => {
    let id: number = 0;
    return () => ++id;
})();

/**
 * Extends target object adding key/value pairs from sources
 */
export function extend(target: Object, ...sources: Object[]): Object {
    if (Array.isArray(sources)) {
        for(let source of sources) {
            if (source) {
                for (let prop of Object.keys(source)) {
                    target[prop] = source[prop];
                }
            }
        }
    }
    
    return target;
}

/**
 * Returns a template replacing placeholders with values
 */
export function compileTemplate(tmpl: string, hashMap: {[idx: string]: string}): string {
    for(let key of Object.keys(hashMap)) {
        tmpl = tmpl.replace(new RegExp(`\\$${key}`, 'g'), hashMap[key]);
    }
    
    return tmpl;
}

/**
 * Injects custom styles into the head of the document
 */
export function injectStyles(styles: string): void {
    let style = doc.createElement('style');
    style.innerHTML = styles;
    head.appendChild(style);
}

/**
 * Shortcut for document.createElement
 */
export function createElement(tag: string = 'div'): HTMLElement {
    return doc.createElement(tag);
}

/**
 * Repeats a string length number of times
 */
export function repeatString(length: number, msg: string): string {
    return Array(length + 1).join(msg);
}

/**
 * Returns a char from its charCode
 */
export function toChar(code: number): string {
    return String.fromCharCode(code);
}

/**
 * string to html
 */
export function htmlEncode(raw: string): string {
    let tmp = createElement();
    tmp.textContent = raw;
    return tmp.innerHTML.replace(SPACE_RE, USPACE);
}

/**
 * html to string
 */
export function htmlDecode(html: string): string {
    let tmp = createElement();
    tmp.innerHTML = html;
    return tmp.textContent;
}

/**
 * Returns non-breaking spaces
 */
export function space(length: number = 1): string {
    return repeatString(length, USPACE);
}

/**
 * Returns a Text node
 */
export function createText(text: string): Text {
    return doc.createTextNode(text.replace(SPACE_RE, USPACE));
}

/**
 * Creates a fragment with optional nodes
 */
export function createFragment(...nodes: Node[]): DocumentFragment {
    let fragment = doc.createDocumentFragment();
    
    for (let node of nodes) {
        fragment.appendChild(node);
    }
    
    return fragment;
}

/**
 * Defers functions to the next tick (event loop)
 */
export function defer(callback: Function) {
    setTimeout(callback);
}
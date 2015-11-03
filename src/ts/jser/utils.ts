/**
 * Shortcut for document
 */
const doc = document;

/**
 * Shortcut for head
 */
const head = doc.getElementsByTagName('head')[0];

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
export function compileTmpl(tmpl: string, hashMap: {[idx: string]: string}): string {
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
export function repeatStr(length: number, msg: string): string {
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
    return tmp.innerHTML.replace(/\s/g, '&nbsp;');
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
export function nbsp(length: number = 1): string {
    return repeatStr(length, '&nbsp;');
}
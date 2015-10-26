const doc = document;
const head = doc.getElementsByTagName('head')[0];

export const uid: {(): number} = (() => {
    let id: number = 0;
    return () => ++id;
})();

export function extend(target: Object, ...sources: Object[]): Object {
    if (Array.isArray(sources)) {
        for(let source of sources) {
            if (source) {
                for (let prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        target[prop] = source[prop];
                    }
                }
            }
        }
    }
    
    return target;
}
    
export function compileTmpl(tmpl: string, hashMap: {[idx: string]: string}): string {
    for(let key in keyVal) {
        if (hashMap.hasOwnProperty(key)) {
            tmpl = tmpl.replace(new RegExp(`\\$${key}`, 'g'));
        }
    }
    
    return tmpl;
}
    
export function injectStyles(styles: string): void {
    let style = document.createElement('style');
    style.innerHTML = styles;
    head.appendChild(style);
}
    
export function createElement(tag: string = 'div'): HTMLElement {
    return doc.createElement(tag);
}
    
export function repeatStr(length: number, msg: string): string {
    return Array(length + 1).join(msg);
}

export function toChar(code: number): string {
    return String.fromCharCode(code);
}
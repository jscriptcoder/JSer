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
                for (let prop of Object.keys(source)) {
                    target[prop] = source[prop];
                }
            }
        }
    }
    
    return target;
}
    
export function compileTmpl(tmpl: string, hashMap: {[idx: string]: string}): string {
    for(let key of Object.keys(hashMap)) {
        tmpl = tmpl.replace(new RegExp(`\\$${key}`, 'g'), hashMap[key]);
    }
    
    return tmpl;
}
    
export function injectStyles(styles: string): void {
    let style = doc.createElement('style');
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

export function htmlEncode(raw: string): string {
    var tmp = createElement();
    tmp.textContent = raw;
    return tmp.innerHTML.replace(/\s/g, '&nbsp;');
}

export function htmlDecode(html: string): string {
    var tmp = createElement();
    tmp.innerHTML = html;
    return tmp.textContent;
}
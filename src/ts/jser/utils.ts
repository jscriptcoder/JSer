export const uid = (() => {
    let uid = 0;
    return () => ++uid;
})();

export function extend(target: Object, ...sources: Object[]) {
    
    if (sources && sources.length) {
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
declare var Promise: any;

export default class APITest {
    
    testing: boolean = true;
    
    test(...args) {
        return `Testing ${args.length ? args.join(', ') : ''}`;
    }
    
    asyncTest(...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (args[0] === 'error') {
                    reject(`[REJECTED] Testing ${args.length ? args.join(', ') : ''}`);   
                } else {
                    resolve(`Testing ${args.length ? args.join(', ') : ''}`);
                }
            }, 5000);
        });
    }
    
}
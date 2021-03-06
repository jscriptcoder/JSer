import JSer from '../jser/jser';

export default class TestAPI {
    
    public jser: JSer;
    
    public apiName: string = 'TestAPI';
    
    public testing: boolean = true;
    
    public name: string = 'TestAPI'
    
    public author: string = 'Fran'
    
    public age: number = 37;
    
    public list: any[] = ['something', 4, true, new Date()];
    
    public test(...args) {
        return `Testing ${args.length ? args.join(', ') : ''}`;
    }
    
    public asyncTestWithPromise(...args) {
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
    
    public foo(param1: string, param2: number) {
        return this.test(param1, param2);
    }
    
    public boo(param1: boolean, param2: Object) {
        return this.asyncTest(param1, param2);
    }
    
    public asyncTest(...args) {
        this.jser.promptWaiting();
        
        setTimeout(() => {
            this.jser.promptWaiting(false);
            
            if (args[0] === 'error') {
                this.jser.errorMessage(`[ERROR] Testing ${args.length ? args.join(', ') : ''}`);   
            } else {
                this.jser.infoMessage(`Testing ${args.length ? args.join(', ') : ''}`);
            }
        }, 3000);
    }
    
}
export default class APITest {
    
    testing: boolean = true;
    
    test(...args) {
        return `Testing ${args.length ? args.join(', ') : ''}`;
    }
    
}
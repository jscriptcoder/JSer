export default class APITest {
    
    test(...args) {
        return `Testing ${args.length ? args.join(', ') : ''}`;
    }
    
}
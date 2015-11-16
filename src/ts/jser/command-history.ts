/**
 * Keeps track of a history of commands
 */
export default class CommandHistory {
    
    /**
     * List of commands
     */
    private __commands__: string[];
    
    /**
     * Pointer to the current commands
     */
    private __index__: number;
    
    /**
     * Configuration item: limit of commands to store
     */
    private __limit__: number;
    
    constructor(limit: number = 50) {
        this.__commands__ = [];
        this.__index__ = -1;
        this.__limit__ = limit;
    }
    
    /**
     * Gets a command in the given index
     */
    public get(idx: number = this.__index__): string {
        if (~idx) { // is valid index? (not -1)
            return this.__commands__[this.__index__] || '';
        } else {
            return '';
        }
    }
    
    /**
     * Returns the current index
     */
    public get index(): number {
        return this.__index__;
    }
    
    /**
     * Returns the first command
     */
    public get first(): string {
        return this.get(0);
    }
    
    /**
     * Returns the last command
     */
    public get last(): string {
        return this.get(this.__commands__.length - 1);
    }
    
    /**
     * Returns the next command
     */
    public get next(): string {
        const idx = this.__index__;
        const limit = this.__commands__.length;
        
        // moves the index to the next one
        this.__index__ = idx < limit ? idx + 1 : limit;
        
        return this.get();
    }
    
    /**
     * Returns the previous command
     */
    public get previous(): string {
        const idx = this.__index__;
        
        // moves the index to the previous one
        this.__index__ = idx > 0 ? idx - 1 : 0;
        
        return this.get();
    }
    
    /**
     * Adds a new command to the list
     */
    public add(cmd: string): void {
        
        // we skip storing the command if it's empty
        if (!cmd) return;
        
        // we skip storing the command if it's the same as the last one
        if (cmd === this.last) return;
        
        this.__commands__.push(cmd);
        
        if (this.__commands__.length > this.__limit__) {
            // we've surpassed the limit, let's delete the first command
            this.__commands__.shift();
        }
        
        this.__index__ = this.__commands__.length;
    }
    
    /**
     * Destroys the object
     */
    public destroy(): void {
        this.__commands__.length = 0;
    }
    
}
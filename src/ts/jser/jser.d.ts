interface JSerAPI {
    help(...args: any[]);
}

interface JSerConfig {
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontFamily?: string;
    promptSymbol?: string;
    historyLimit?: number
    tabLength?: number;
    active?: boolean;
}
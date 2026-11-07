export declare class Logger {
    private logDirectory;
    private currentTestFile;
    constructor(logDirectory?: string);
    private initializeLogs;
    setTestFile(testName: string): void;
    logInfo(message: string): void;
    logError(message: string): void;
}

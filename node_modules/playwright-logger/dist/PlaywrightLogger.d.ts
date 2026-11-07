export declare class PlaywrightLogger {
    private logger;
    constructor();
    logInfo(message: string): void;
    logError(message: string): void;
}
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;

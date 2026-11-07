import { test as baseTest } from '@playwright/test';
import { Logger } from './Logger.js';
export class PlaywrightLogger {
    logger;
    constructor() {
        this.logger = new Logger();
    }
    logInfo(message) {
        this.logger.logInfo(message);
    }
    logError(message) {
        this.logger.logError(message);
    }
}
// Create an instance of Logger
const logger = new Logger();
// Extend Playwright's test fixture
export const test = baseTest.extend({
    page: async ({ page }, use, testInfo) => {
        // Initialize logs for each test
        logger.setTestFile(testInfo.title);
        // Create a Proxy for the page
        const wrappedPage = new Proxy(page, {
            get(target, prop) {
                const originalMethod = Reflect.get(target, prop); // Safely access properties
                if (typeof originalMethod === 'function') {
                    return async (...args) => {
                        logger.logInfo(`Calling method: ${String(prop)} with args: ${JSON.stringify(args)}`);
                        try {
                            const result = await originalMethod.apply(target, args); // Apply the original method
                            logger.logInfo(`Method: ${String(prop)} executed successfully`);
                            return result;
                        }
                        catch (error) {
                            logger.logError(`Error in method: ${String(prop)} - ${error}`);
                            throw error;
                        }
                    };
                }
                // Return non-function properties as is
                return originalMethod;
            },
        });
        await use(wrappedPage);
    },
});

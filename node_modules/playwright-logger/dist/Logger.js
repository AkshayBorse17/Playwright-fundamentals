import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
export class Logger {
    logDirectory;
    currentTestFile = null;
    constructor(logDirectory = 'logs') {
        this.logDirectory = path.resolve(logDirectory);
        this.initializeLogs();
    }
    initializeLogs() {
        if (fs.existsSync(this.logDirectory)) {
            fs.rmSync(this.logDirectory, { recursive: true });
        }
        fs.mkdirSync(this.logDirectory, { recursive: true });
    }
    setTestFile(testName) {
        this.currentTestFile = path.join(this.logDirectory, `${testName}.log`);
        fs.writeFileSync(this.currentTestFile, chalk.blue(`Logs for test: ${testName}\n`));
    }
    logInfo(message) {
        const logMessage = chalk.green(`[INFO]: ${message}`);
        console.log(logMessage);
        if (this.currentTestFile) {
            fs.appendFileSync(this.currentTestFile, `${logMessage}\n`);
        }
    }
    logError(message) {
        const logMessage = chalk.red(`[ERROR]: ${message}`);
        console.log(logMessage);
        if (this.currentTestFile) {
            fs.appendFileSync(this.currentTestFile, `${logMessage}\n`);
        }
    }
}

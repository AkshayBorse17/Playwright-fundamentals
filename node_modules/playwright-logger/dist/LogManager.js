import fs from 'fs';
import path from 'path';
export class LogManager {
    static cleanLogs(logDirectory = 'logs') {
        const logPath = path.resolve(logDirectory);
        if (fs.existsSync(logPath)) {
            fs.rmSync(logPath, { recursive: true });
            console.log(`Logs cleaned in directory: ${logPath}`);
        }
    }
}

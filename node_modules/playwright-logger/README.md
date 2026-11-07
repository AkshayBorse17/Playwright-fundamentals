# Playwright Logger

A simple and effective logging utility for Playwright automation tests. This library enhances debugging by automatically logging each test step and cleaning logs after every test run.

## Features
- Automatically logs every Playwright action.
- Supports colored logs using `chalk`.
- Cleans up logs after test execution.
- Simple integration with Playwright.

## Installation
To install the library, run:

```bash
npm install playwright-logger
```

## Usage

### Import and Extend Playwright Test
Modify your Playwright test setup to include the logger:

```typescript
import { test } from 'playwright-logger';

test('Example test with logging', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('text=More information');
});
```

### Custom Logging
You can use the logger manually within your test:

```typescript
import { Logger } from 'playwright-logger';

// ✅ You no longer need to import from a submodule (e.g., `playwright-logger/dist`)

const logger = new Logger();
logger.logInfo('This is an informational log');
logger.logError('This is an error log');

```

## Example Output

Here are some examples of how the logs appear in the terminal and log files:

### Terminal Log Output
![Terminal Log Output](https://github.com/msanmartin90/playwright-logger-lib/blob/main/screenshots/terminaloutput.png?raw=true)

### Log File with Error Handling
![Log File Example](https://github.com/msanmartin90/playwright-logger-lib/blob/main/screenshots/errorhandle.png?raw=true)

### Standard Log File Output
![Standard Log File](https://github.com/msanmartin90/playwright-logger-lib/blob/main/screenshots/standardoutput.png?raw=true)

## Configuration
### Package.json Support
Make sure you have the following added in your package.json file.
```json
{
  "type": "module"
}

```

### TypeScript Support
If you're using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./tests",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["tests/**/*"],
  "exclude": ["node_modules"]
}

```

### Cleaning Logs
To automatically clean logs after each test, update `package.json`:

```json
"scripts": {
  "playwright-test": "npx playwright test && rm -rf ./test-results"
}
```

## Troubleshooting
If you encounter issues with `chalk`, ensure your project is using ES modules (`"type": "module"` in `package.json`).

## Contributing
Feel free to open issues and submit pull requests on GitHub.

## License
MIT License


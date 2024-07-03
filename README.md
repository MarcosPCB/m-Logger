# Marco's Logger for Node.js

Marco's Logger for Node.js is a robust and efficient logging solution designed to streamline your logging processes and enhance your application's maintainability. Built on the reliable and widely-used log4js library, Marco's Logger offers advanced features tailored to meet your logging needs.

## Key Features:

- **Level Logging System**: Easily manage and categorize your logs with multiple levels (e.g., info, warn, error). This allows for more granular control over the logging output, making it simpler to identify and diagnose issues.

- **Console and File Logging**: Logs messages both to the console and to files. This dual logging approach ensures you have real-time visibility of your logs and a persistent record for future reference.

- **Daily Log File Creation**: Automatically creates new log files on a daily basis. This feature helps you keep your logs organized by date, making it easier to pinpoint when specific events or errors occurred.

- **Easy Integration**: Seamlessly integrate Marco's Logger into your existing Node.js application with minimal setup. The package is designed to work out-of-the-box, providing you with instant logging capabilities.

- **Configurable Settings**: Customize log file paths, logging levels, and other settings to suit your specific needs. Tailor the logger to match your application's requirements and preferences.

- **Lightweight and Efficient**: Built with performance in mind, Marco's Logger adds minimal overhead to your application, ensuring it remains fast and responsive.

- **Enhanced Debugging**: Gain deeper insights into your application's behavior with detailed log messages. The logger captures relevant context and timestamps, making debugging more straightforward.

## Benefits:

- **Improved Troubleshooting**: Quickly identify and resolve issues by reviewing categorized and timestamped log files.
- **Better Organization**: Keep your logs neat and orderly with automatic daily log file creation.
- **Increased Control**: Adjust logging levels and configurations to meet your specific application needs.
- **Enhanced Maintainability**: Maintain cleaner and more manageable code with a structured logging system.
- **Real-Time Visibility**: Monitor your application's performance and behavior in real-time through console logging.

## How to Use

### Step 1: Initialize the Logger

To start using Marco's Logger, you need to initialize it with your preferred settings. Here’s how you can do it:

```javascript
const logger = require('marcos-logger');

logger.init({
    path: '.',                // Path for saving the log files
    level_error: true,        // Create a separate file for error logs
    level_warning: true,      // Create a separate file for warning logs
    daily: true               // Log files are dated daily
});
```

### Parameters:

- **path**: The directory where log files will be saved. Example: `path: './logs'`.
- **level_error**: Boolean flag to create a separate file for error logs. Example: `level_error: true`.
- **level_warning**: Boolean flag to create a separate file for warning logs. Example: `level_warning: true`.
- **daily**: Boolean flag to create daily dated log files. Example: `daily: true`.

### Step 2: Logging Messages

After initialization, you can log messages at various levels:

```javascript
logger.info('This is an informational message.');
logger.warn('This is a warning message.');
logger.error('This is an error message.');
```

### Step 3: Timing Operations

You can also create labeled timers to measure the duration of operations. The timer logs the start and end times:

```javascript
logger.time('operation');
// Your code here
logger.timeEnd('operation');
```

### Example Usage:

```javascript
// Import the logger
const logger = require('marcos-logger');

// Initialize the logger with configuration
logger.init({
    path: './logs',
    level_error: true,
    level_warning: true,
    daily: true
});

// Log some messages
logger.info('Application started.');
logger.warn('This is a warning message.');
logger.error('An error occurred.');

// Measure the time taken for an operation
logger.time('database_query');
// Simulate a database query
setTimeout(() => {
    logger.timeEnd('database_query');
}, 2000);
```

Elevate your Node.js application's logging capabilities with Marco's Logger, built on the robust log4js foundation. Simplify your debugging process, keep your logs organized, and manage log file storage effortlessly. Install and integrate Marco's Logger today to experience the benefits of efficient and reliable logging.
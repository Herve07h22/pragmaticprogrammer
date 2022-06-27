import { FileHandle, open } from "node:fs/promises";

// Decorator Pattern
interface Logger {
  log: (message: string) => void;
}

class FileLogger implements Logger {
  constructor(private _file: FileHandle) {}
  log(message: string) {
    this._file.write(message + "\n");
  }
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message + "\n");
  }
}

class LogFilter implements Logger {
  constructor(private _pattern: RegExp, private _logger: Logger) {}
  log(message: string) {
    if (message.match(this._pattern)) {
      this._logger.log(message);
    }
  }
}

const log1 = new ConsoleLogger();
// LogFilter "extends" log1 to add a new feature. That's a decorator pattern.
const log2 = new LogFilter(/Error/, log1);
// You can also compose the filters :
const log2composed = new LogFilter(/important/, log2);
log1.log("[1] Noisy: this logger always produces output");
log2.log("[1] Ignored: this will be filtered out");
log2.log("[1] Error: this is important and gets printed");
log2composed.log("[1] Error: this is severe but wont get printed");
log2composed.log("[1] Error: this is important and gets printed");

// Functionnal design

// Note how reusable theses functions are
type FnTextHandler = (message: string) => void;
type FnTextFilter = (message: string) => boolean;

// Functions instead of classes
// Can apply multiple filters, and log simultaneously to multiple loggers
const logger =
  (handlers: FnTextHandler[], filters: FnTextFilter[]) => (message: string) => {
    if (filters.map((f) => f(message)).every(Boolean)) {
      handlers.forEach((h) => h(message));
    }
  };

const consoleLogger: FnTextHandler = console.log;
const fileLogger = (file: FileHandle) => async (message: string) =>
  await file.write(message + "\n").catch((e) => {
    console.log(`Error while writing message ${message}`);
    console.log(e);
  });
const regexpFilter = (pattern: RegExp) => (message: string) =>
  !!message.match(pattern);

open("test.log", "a+").then((file) => {
  const logErrorsToFileAndConsole = logger(
    [consoleLogger, fileLogger(file)],
    [regexpFilter(/Error/)]
  );
  logErrorsToFileAndConsole("[2] Ignored: this will be filtered out");
  logErrorsToFileAndConsole("[2] Error: this is important and gets printed");
  logErrorsToFileAndConsole(
    "[2] Error: this is important and gets printed too"
  );
});

// But, we have to wait for the file to be opened before logging anything.
// So let's turn the fileLogger into a statefull one

class SafeFileLogger {
  // Store the messages until the file is open
  _messageQueue: string[] = [];

  // Instead of storing a usual state like an enum, let's use a set of functions (State pattern)
  _writeMethod: FnTextHandler = (message: string) =>
    this._messageQueue.push(message);

  constructor(fileName: string) {
    open(fileName, "a+")
      .then((file) => {
        console.log(`There are ${this._messageQueue.length} messages to flush`);
        this._writeMethod = fileLogger(file);
        this._messageQueue.forEach((message) => this._writeMethod(message));
        this._messageQueue = [];
      })
      .catch((e) => {
        console.log(`Error while opening file ${fileName}`);
        console.log(e);
        this._writeMethod = () => null;
      });
  }

  log(message: string) {
    this._writeMethod(message);
  }
}

const safeFileLogger = new SafeFileLogger("test2.log");

const logErrorsToSafeFileAndConsole = logger(
  [consoleLogger, (m) => safeFileLogger.log(m)],
  [regexpFilter(/Error/)]
);

// No need to wait for the file to be opened : the log messages are queued
logErrorsToSafeFileAndConsole(
  "[3] Error: this is important and gets printed (1)"
);
logErrorsToSafeFileAndConsole(
  "[3] Error: this is important and gets printed (2)"
);
logErrorsToSafeFileAndConsole(
  "[3] Error: this is important and gets printed (3)"
);

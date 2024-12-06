import { PassThrough } from 'stream';
import { TransformOptions } from 'stream';

interface StreamStatsOptions extends TransformOptions {
  ignoreWords?: string[];
  throttleDelayMs?: number;
  progressHandler?: (progress: any) => void;
  includeField?: (tokenData: string) => boolean;
}

// // Usage Example
// const statsStream = new StatsStream({
//   ignoreWords: ['a', 'the', 'and'],
//   throttleDelayMs: 100,
//   progressHandler: (progress) => {
//     console.log('Progress:', progress);
//   },
//   includeField: (token) => token.length > 2, // Example condition
// });

// process.stdin.pipe(statsStream).pipe(process.stdout);

/**
 * 
 */
export class StatsStream extends PassThrough {
  private wordCount: number = 0;
  private lineCount: number = 0;
  private objectCount: number = 0;
  private startTime: number;
  private lastProgressUpdateTime: number;
  private ignoreWords: Set<string>;
  private throttleDelayMs: number;
  private progressHandler?: (progress: any) => void;
  private includeField?: (tokenData: string) => boolean;

  private _currentLine: string = '';
  

  constructor(options: StreamStatsOptions) {
    super(options);

    this.startTime = Date.now();
    this.lastProgressUpdateTime = this.startTime;
    this.ignoreWords = new Set(options.ignoreWords || []);
    this.throttleDelayMs = options.throttleDelayMs || 100;
    this.progressHandler = options.progressHandler;
    this.includeField = options.includeField;

    this.on('data', this.handleData.bind(this));
  }

  private handleData(chunk: any) {
    const currentTime = Date.now();
    const isString = typeof chunk === 'string';
    const isObject = typeof chunk === 'object' && !Buffer.isBuffer(chunk);

    if (isString) {
      this.processStringChunk(chunk);
    } else if (isObject) {
      this.processObjectChunk();
    }

    if (
      this.progressHandler &&
      currentTime - this.lastProgressUpdateTime > this.throttleDelayMs
    ) {
      this.lastProgressUpdateTime = currentTime;
      this.emitProgress();
    }
  }

  private processStringChunk(chunk: string) {
    const lines = chunk.split(/\r?\n/);
    this.lineCount += lines.length - 1;

    lines.forEach((line) => {
      const tokens = line.split(/\s+/);
      tokens.forEach((token) => {
        if (token && !this.ignoreWords.has(token) && (!this.includeField || this.includeField(token))) {
          this.wordCount++;
        }
      });
    });
  }

  private processObjectChunk() {
    this.objectCount++;
  }

  private emitProgress() {
    const elapsedTimeSec = (Date.now() - this.startTime) / 1000;
    const progress = {
      wordCount: this.wordCount,
      lineCount: this.lineCount,
      objectCount: this.objectCount,
      wordsPerSec: elapsedTimeSec > 0 ? this.wordCount / elapsedTimeSec : 0,
      linesPerSec: elapsedTimeSec > 0 ? this.lineCount / elapsedTimeSec : 0,
      objectsPerSec: elapsedTimeSec > 0 ? this.objectCount / elapsedTimeSec : 0,
    };

    if (this.progressHandler) {
      this.progressHandler(progress);
    }
  }
}

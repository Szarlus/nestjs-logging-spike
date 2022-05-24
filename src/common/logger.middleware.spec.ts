import { Logger } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware(new Logger())).toBeDefined();
  });
});

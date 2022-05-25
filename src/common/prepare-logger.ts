import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export const prepareLogger = () =>
  WinstonModule.forRoot({
    exitOnError: false,
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.splat(),
          format.json(),
        ),
      }),
    ],
  });
